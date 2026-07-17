import { Router, type IRouter } from "express";
import { db, securityStatsTable } from "@workspace/db";
import {
  PROTECTION_LAYERS,
  RECENT_ALERTS,
  SCAM_PATTERN_STATS,
  SECURITY_TIPS,
} from "../lib/security-content";

const router: IRouter = Router();

router.get("/security/overview", async (_req, res): Promise<void> => {
  const [stats] = await db.select().from(securityStatsTable);
  res.json({
    stats: {
      analyzedCount: stats?.analyzedCount ?? 0,
      flaggedCount: stats?.flaggedCount ?? 0,
      blockedCount: stats?.blockedCount ?? 0,
      protectedAmount: stats?.protectedAmount ?? 0,
      communityReports: stats?.communityReports ?? 0,
      activeScamAccounts: stats?.activeScamAccounts ?? 0,
    },
    patterns: SCAM_PATTERN_STATS,
    recentAlerts: RECENT_ALERTS,
    layers: PROTECTION_LAYERS,
    tips: SECURITY_TIPS,
  });
});

export default router;
