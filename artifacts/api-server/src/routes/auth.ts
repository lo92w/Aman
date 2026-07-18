import { Router, type IRouter } from "express";
import { db, usersTable, transfersTable, notificationsTable, beneficiariesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { LoginBody } from "@workspace/api-zod";
import { DEMO_USER_ID, getDemoUser, mapUser } from "../lib/aman-service";

const router: IRouter = Router();

/**
 * دخول تجريبي: أي بيانات مقبولة — يعيد المستخدم التجريبي دائمًا.
 */
router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "أدخل اسم مستخدم وكلمة مرور" });
    return;
  }

  // كل جلسة جديدة تبدأ نظيفة — احذف الحوالات والإشعارات وأعد الرصيد وصحّح الأسماء
  await db.delete(transfersTable).where(eq(transfersTable.userId, DEMO_USER_ID));
  await db.delete(notificationsTable).where(eq(notificationsTable.userId, DEMO_USER_ID));
  await db
    .update(usersTable)
    .set({ fullName: "أليانا الشريف", balance: 47_320.75, heldAmount: 0, lastLoginAt: new Date() })
    .where(eq(usersTable.id, DEMO_USER_ID));
  await db
    .update(beneficiariesTable)
    .set({ name: "نوف العنزي" })
    .where(eq(beneficiariesTable.id, 1));
  await db
    .update(beneficiariesTable)
    .set({ name: "ملك العتيبي" })
    .where(eq(beneficiariesTable.id, 2));

  const user = await getDemoUser();
  req.log.info({ username: parsed.data.username }, "demo login");
  res.json(mapUser(user));
});

router.get("/me", async (_req, res): Promise<void> => {
  const user = await getDemoUser();
  res.json(mapUser(user));
});

export default router;
