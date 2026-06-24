import { sql } from 'drizzle-orm';
import {
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
} from 'drizzle-orm/pg-core';

import { user } from './auth-schema.js';

export const account_type = pgEnum('account_type', [
  'checking',
  'savings',
  'cash',
  'credit_card',
  'other',
]);
export const balance_snapshot_source = pgEnum('balance_snapshot_source', [
  'manual',
  'bank_sync',
]);
export const recurring_item_type = pgEnum('recurring_item_type', [
  'income',
  'expense',
]);
export const recurrence_frequency = pgEnum('recurrence_frequency', [
  'weekly',
  'monthly',
  'yearly',
]);
export const recurring_item_event_status = pgEnum(
  'recurring_item_event_status',
  ['expected', 'accounted', 'skipped'],
);
export const recurring_item_event_source = pgEnum(
  'recurring_item_event_source',
  ['system', 'manual', 'bank_match'],
);

export const user_settings = pgTable(
  'user_settings',
  {
    user_id: text('user_id')
      .primaryKey()
      .references(() => user.id, { onDelete: 'cascade' }),
    safe_spend_buffer_cents: integer('safe_spend_buffer_cents')
      .notNull()
      .default(0),
    forecast_horizon_days: integer('forecast_horizon_days')
      .notNull()
      .default(30),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check(
      'user_settings_safe_spend_buffer_cents_non_negative',
      sql`${table.safe_spend_buffer_cents} >= 0`,
    ),
    check(
      'user_settings_forecast_horizon_days_range',
      sql`${table.forecast_horizon_days} BETWEEN 1 AND 365`,
    ),
  ],
);

export const money_account = pgTable(
  'money_account',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    user_id: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    type: account_type('type').notNull(),
    include_in_safe_spend: boolean('include_in_safe_spend')
      .notNull()
      .default(true),
    is_active: boolean('is_active').notNull().default(true),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('money_account_user_id_name_unique').on(
      table.user_id,
      table.name,
    ),
    uniqueIndex('money_account_id_user_id_unique').on(table.id, table.user_id),
  ],
);

export const balance_snapshot = pgTable('balance_snapshot', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  money_account_id: integer('money_account_id')
    .notNull()
    .references(() => money_account.id, { onDelete: 'cascade' }),
  balance_cents: integer('balance_cents').notNull(),
  source: balance_snapshot_source('source').notNull().default('manual'),
  balance_as_of: timestamp('balance_as_of', { withTimezone: true })
    .notNull()
    .defaultNow(),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const recurring_item = pgTable(
  'recurring_item',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    user_id: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    money_account_id: integer('money_account_id'),
    name: text('name').notNull(),
    type: recurring_item_type('type').notNull(),
    amount_cents: integer('amount_cents').notNull(),
    frequency: recurrence_frequency('frequency').notNull(),
    interval_count: integer('interval_count').notNull().default(1),
    days_of_month: integer('days_of_month').array(),
    anchor_date: date('anchor_date').notNull(),
    include_in_safe_spend: boolean('include_in_safe_spend')
      .notNull()
      .default(true),
    is_active: boolean('is_active').notNull().default(true),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    foreignKey({
      name: 'recurring_item_money_account_user_fk',
      columns: [table.money_account_id, table.user_id],
      foreignColumns: [money_account.id, money_account.user_id],
    }).onDelete('restrict'),
    check(
      'recurring_item_amount_cents_positive',
      sql`${table.amount_cents} > 0`,
    ),
    check(
      'recurring_item_interval_count_positive',
      sql`${table.interval_count} > 0`,
    ),
  ],
);

export const recurring_item_event = pgTable(
  'recurring_item_event',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    recurring_item_id: integer('recurring_item_id')
      .notNull()
      .references(() => recurring_item.id, { onDelete: 'cascade' }),
    expected_date: date('expected_date').notNull(),
    amount_cents: integer('amount_cents').notNull(),
    status: recurring_item_event_status('status').notNull().default('expected'),
    source: recurring_item_event_source('source').notNull().default('system'),
    completed_at: timestamp('completed_at', { withTimezone: true }),
    notes: text('notes'),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('recurring_item_event_item_date_unique').on(
      table.recurring_item_id,
      table.expected_date,
    ),
    check(
      'recurring_item_event_amount_cents_positive',
      sql`${table.amount_cents} > 0`,
    ),
  ],
);

export const spending_tracker = pgTable(
  'spending_tracker',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    user_id: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    monthly_limit_cents: integer('monthly_limit_cents'),
    is_active: boolean('is_active').notNull().default(true),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('spending_tracker_user_id_name_unique').on(
      table.user_id,
      table.name,
    ),
    check(
      'spending_tracker_monthly_limit_cents_positive',
      sql`
        ${table.monthly_limit_cents} IS NULL
        OR ${table.monthly_limit_cents} > 0
      `,
    ),
  ],
);

export const spending_entry = pgTable(
  'spending_entry',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    spending_tracker_id: integer('spending_tracker_id')
      .notNull()
      .references(() => spending_tracker.id, { onDelete: 'cascade' }),
    amount_cents: integer('amount_cents').notNull(),
    description: text('description'),
    spent_at: timestamp('spent_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check(
      'spending_entry_amount_cents_positive',
      sql`${table.amount_cents} > 0`,
    ),
  ],
);
