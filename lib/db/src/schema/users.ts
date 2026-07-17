import {
  pgTable,
  text,
  serial,
  timestamp,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  iban: text("iban").notNull(),
  accountNumber: text("account_number").notNull(),
  bank: text("bank").notNull(),
  balance: doublePrecision("balance").notNull().default(0),
  heldAmount: doublePrecision("held_amount").notNull().default(0),
  currency: text("currency").notNull().default("SAR"),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({
  id: true,
  createdAt: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;
