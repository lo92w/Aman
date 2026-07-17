import {
  pgTable,
  text,
  serial,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const beneficiariesTable = pgTable("beneficiaries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  name: text("name").notNull(),
  bank: text("bank").notNull(),
  iban: text("iban").notNull(),
  relationship: text("relationship"),
  transferCount: integer("transfer_count").notNull().default(0),
  lastTransferAt: timestamp("last_transfer_at", { withTimezone: true }),
  trusted: boolean("trusted").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertBeneficiarySchema = createInsertSchema(
  beneficiariesTable,
).omit({ id: true, createdAt: true });
export type InsertBeneficiary = z.infer<typeof insertBeneficiarySchema>;
export type Beneficiary = typeof beneficiariesTable.$inferSelect;
