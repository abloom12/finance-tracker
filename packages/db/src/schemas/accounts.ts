import { pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const accountType = pgEnum('account_type', [
  'checking',
  'savings',
  'cash',
  'liability',
]);

export const liabilityType = pgEnum('liability_type', [
  'credit_card',
  'loan',
  'line_of_credit',
  'medical_debt',
  'personal_debt',
  'other',
]);

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: accountType('type').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const debt_accounts = pgTable('debt_accounts', {});
