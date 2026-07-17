import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export interface NetworkInsightJson {
  inflows48h: number;
  uniqueSenders: number;
  avgHoldMinutes: number;
  outflowRatio: number;
  summary: string;
}

/**
 * Simulated "bank network intelligence" about recipient accounts.
 * Keyed by normalized IBAN (uppercase, no spaces).
 */
export const recipientProfilesTable = pgTable("recipient_profiles", {
  id: serial("id").primaryKey(),
  iban: text("iban").notNull().unique(),
  holderName: text("holder_name").notNull(),
  bank: text("bank").notNull(),
  accountAgeMonths: integer("account_age_months").notNull().default(0),
  communityReports: integer("community_reports").notNull().default(0),
  velocityFlag: boolean("velocity_flag").notNull().default(false),
  muleScore: integer("mule_score").notNull().default(0),
  nameVerified: boolean("name_verified").notNull().default(true),
  scamPatterns: jsonb("scam_patterns")
    .$type<string[]>()
    .notNull()
    .default([]),
  networkInsight: jsonb("network_insight").$type<NetworkInsightJson | null>(),
  notes: text("notes"),
});

export const insertRecipientProfileSchema = createInsertSchema(
  recipientProfilesTable,
).omit({ id: true });
export type InsertRecipientProfile = z.infer<
  typeof insertRecipientProfileSchema
>;
export type RecipientProfile = typeof recipientProfilesTable.$inferSelect;
