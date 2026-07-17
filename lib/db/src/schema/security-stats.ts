import {
  pgTable,
  serial,
  integer,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

/**
 * Network-wide protection stats (singleton row) — simulated aggregate
 * intelligence for the prototype, incremented live by transfer events.
 */
export const securityStatsTable = pgTable("security_stats", {
  id: serial("id").primaryKey(),
  analyzedCount: integer("analyzed_count").notNull().default(0),
  flaggedCount: integer("flagged_count").notNull().default(0),
  blockedCount: integer("blocked_count").notNull().default(0),
  protectedAmount: doublePrecision("protected_amount").notNull().default(0),
  communityReports: integer("community_reports").notNull().default(0),
  activeScamAccounts: integer("active_scam_accounts").notNull().default(0),
});

export const insertSecurityStatsSchema = createInsertSchema(
  securityStatsTable,
).omit({ id: true });
export type InsertSecurityStats = z.infer<typeof insertSecurityStatsSchema>;
export type SecurityStats = typeof securityStatsTable.$inferSelect;
