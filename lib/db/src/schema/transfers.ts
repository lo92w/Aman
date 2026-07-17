import {
  pgTable,
  text,
  serial,
  integer,
  timestamp,
  doublePrecision,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export interface TrustFactorJson {
  id: string;
  label: string;
  detail: string;
  impact: number;
  kind: "positive" | "negative" | "neutral";
}

export interface TimelineEventJson {
  at: string;
  type: string;
  label: string;
  detail?: string | null;
}

export type TransferStatus =
  | "awaiting_recipient_approval"
  | "in_cooling_period"
  | "completed"
  | "cancelled"
  | "rejected_by_recipient"
  | "expired"
  | "blocked";

export const transfersTable = pgTable("transfers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  beneficiaryId: integer("beneficiary_id"),
  reference: text("reference").notNull(),
  recipientName: text("recipient_name").notNull(),
  recipientIban: text("recipient_iban").notNull(),
  recipientBank: text("recipient_bank").notNull(),
  amount: doublePrecision("amount").notNull(),
  purpose: text("purpose"),
  status: text("status").$type<TransferStatus>().notNull(),
  trustScore: integer("trust_score").notNull(),
  riskLevel: text("risk_level").$type<"low" | "medium" | "high">().notNull(),
  factors: jsonb("factors").$type<TrustFactorJson[]>().notNull().default([]),
  timeline: jsonb("timeline")
    .$type<TimelineEventJson[]>()
    .notNull()
    .default([]),
  approvalDeadline: timestamp("approval_deadline", { withTimezone: true }),
  coolingEndsAt: timestamp("cooling_ends_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const insertTransferSchema = createInsertSchema(transfersTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertTransfer = z.infer<typeof insertTransferSchema>;
export type Transfer = typeof transfersTable.$inferSelect;
