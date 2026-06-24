import { sql } from 'drizzle-orm';
import {
  bigint,
  boolean,
  check,
  date,
  foreignKey,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import { user } from './auth-schema.js';

const accountType = pgEnum('account_type', [
  'checking',
  'savings',
  'cash',
  'credit_card',
  'other',
]);
const snapshotSource = pgEnum('snapshot_source', ['manual', 'bank_sync']);
const recurringItemType = pgEnum('recurring_item_type', ['income', 'expense']);
const recurrenceFrequency = pgEnum('recurrence_frequency', [
  'weekly',
  'monthly',
  'yearly',
]);

export const moneyAccount = pgTable(
  'money_account',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    type: accountType('type').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    includeInSafeSpend: boolean('include_safe_spend').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .$onUpdate(() => new Date())
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex().on(table.id, table.userId),
    uniqueIndex().on(table.name, table.userId),
  ],
);

export const balanceSnapshot = pgTable('balance_snapshot', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  moneyAccountId: integer('money_account_id')
    .notNull()
    .references(() => moneyAccount.id, { onDelete: 'cascade' }),
  balanceCents: bigint('balance_cents', { mode: 'number' }).notNull(),
  source: snapshotSource('source').notNull(),
  balanceAsOf: timestamp('balance_as_of', { withTimezone: true })
    .defaultNow()
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const recurringItem = pgTable(
  'recurring_item',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    moneyAccountId: integer('money_account_id'),
    name: text('name').notNull(),
    type: recurringItemType('type').notNull(),
    amountCents: bigint('amount_cents', { mode: 'number' }).notNull(),
    frequency: recurrenceFrequency('frequency').notNull(),
    intervalCount: integer('interval_count').notNull().default(1),
    anchorDate: date('anchor_date').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    includeInSafeSpend: boolean('include_safe_spend').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .$onUpdate(() => new Date())
      .notNull()
      .defaultNow(),
  },
  (table) => [
    foreignKey({
      name: 'recurring_item_money_account_user_fk',
      columns: [table.moneyAccountId, table.userId],
      foreignColumns: [moneyAccount.id, moneyAccount.userId],
    }).onDelete('restrict'),
    check(
      'recurring_item_amount_cents_positive',
      sql`${table.amountCents} > 0`,
    ),
    check(
      'recurring_item_interval_count_positive',
      sql`${table.intervalCount} > 0`,
    ),
  ],
);
