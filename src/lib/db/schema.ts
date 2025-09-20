import { pgTable, text, jsonb, date } from 'drizzle-orm/pg-core';

// mtrcs table
export const mtrcs = pgTable('mtrcs', {
  date: date('date').notNull().primaryKey(),
  theme: text('theme').notNull(),
  rows: jsonb('rows').notNull(),
});


// Export types for use in your app
export type Mtrx = typeof mtrcs.$inferSelect;
export type NewMtrx = typeof mtrcs.$inferInsert;

