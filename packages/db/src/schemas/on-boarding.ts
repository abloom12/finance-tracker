import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import { user } from './auth-schema.js';

export const onboardingStatusEnum = pgEnum('onboarding_status', [
  'not_started',
  'in_progress',
  'completed',
]);
export const onboardingStepEnum = pgEnum('onboarding_step', [
  'welcome',
  'income',
  'bills',
  'goals',
]);

export const userOnboarding = pgTable(
  'user_onboarding',
  {
    id: integer('id').generatedAlwaysAsIdentity().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    status: onboardingStatusEnum('status').default('not_started').notNull(),
    currentStep: onboardingStepEnum('current_step')
      .default('welcome')
      .notNull(),
    startedAt: timestamp('started_at'),
    completedAt: timestamp('completed_at'),
    lastSeenAt: timestamp('last_seen_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex('user_onboarding_userId_uidx').on(table.userId),
    index('user_onboarding_status_idx').on(table.status),
    index('user_onboarding_currentStep_idx').on(table.currentStep),
  ],
);

export const userOnboardingRelations = relations(userOnboarding, ({ one }) => ({
  user: one(user, { fields: [userOnboarding.userId], references: [user.id] }),
}));
