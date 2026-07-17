import { Router, type IRouter } from "express";
import { db, transfersTable, notificationsTable, securityStatsTable } from "@workspace/db";
import { and, desc, eq } from "drizzle-orm";
import {
  DEMO_USER_ID,
  applyLifecycle,
  getDemoUser,
  mapTransfer,
  mapUser,
} from "../lib/aman-service";

const router: IRouter = Router();

router.get("/dashboard", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(transfersTable)
    .where(eq(transfersTable.userId, DEMO_USER_ID))
    .orderBy(desc(transfersTable.createdAt));

  const transfers = [];
  for (const row of rows) {
    transfers.push(await applyLifecycle(row));
  }

  const user = await getDemoUser();

  const [stats] = await db.select().from(securityStatsTable);
  const protection = {
    analyzedCount: stats?.analyzedCount ?? 0,
    flaggedCount: stats?.flaggedCount ?? 0,
    blockedCount: stats?.blockedCount ?? 0,
    protectedAmount: stats?.protectedAmount ?? 0,
    communityReports: stats?.communityReports ?? 0,
    activeScamAccounts: stats?.activeScamAccounts ?? 0,
  };

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthly = transfers.filter((t) => t.createdAt >= monthStart);
  const monthLabel = new Intl.DateTimeFormat("ar-u-nu-latn", {
    month: "long",
    year: "numeric",
  }).format(now);

  const unread = await db
    .select()
    .from(notificationsTable)
    .where(
      and(
        eq(notificationsTable.userId, DEMO_USER_ID),
        eq(notificationsTable.read, false),
      ),
    );

  res.json({
    user: mapUser(user),
    protection,
    monthly: {
      month: monthLabel,
      transferredAmount: monthly
        .filter((t) => t.status === "completed")
        .reduce((sum, t) => sum + t.amount, 0),
      transferCount: monthly.length,
      safeCount: monthly.filter((t) => t.riskLevel === "low").length,
      flaggedCount: monthly.filter((t) => t.riskLevel !== "low").length,
      blockedCount: monthly.filter((t) => t.status === "blocked").length,
    },
    recentTransfers: transfers.slice(0, 4).map(mapTransfer),
    unreadNotifications: unread.length,
  });
});

export default router;
