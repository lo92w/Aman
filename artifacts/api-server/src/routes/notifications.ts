import { Router, type IRouter } from "express";
import { db, notificationsTable } from "@workspace/db";
import { and, desc, eq } from "drizzle-orm";
import { DEMO_USER_ID, mapNotification } from "../lib/aman-service";

const router: IRouter = Router();

router.get("/notifications", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(notificationsTable)
    .where(eq(notificationsTable.userId, DEMO_USER_ID))
    .orderBy(desc(notificationsTable.createdAt))
    .limit(50);
  res.json(rows.map(mapNotification));
});

router.post("/notifications/read-all", async (_req, res): Promise<void> => {
  const updated = await db
    .update(notificationsTable)
    .set({ read: true })
    .where(
      and(
        eq(notificationsTable.userId, DEMO_USER_ID),
        eq(notificationsTable.read, false),
      ),
    )
    .returning();
  res.json({ success: true, updated: updated.length });
});

export default router;
