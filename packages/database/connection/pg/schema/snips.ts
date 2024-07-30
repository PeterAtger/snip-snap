import {
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './auth';

export const snips = pgTable('snips', {
  id: varchar('id').notNull().primaryKey(),
  snip: text('snip').notNull(),
  description: text('description').notNull(),
  lang: varchar('lang').notNull(),
  user: text('user').notNull().references(() => (users.id)),
  created: timestamp('created').notNull().defaultNow(),
});
