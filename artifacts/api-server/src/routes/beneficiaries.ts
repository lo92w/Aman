import { Router, type IRouter } from "express";
import { db, beneficiariesTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { CreateBeneficiaryBody } from "@workspace/api-zod";
import { DEMO_USER_ID, mapBeneficiary } from "../lib/aman-service";

const router: IRouter = Router();

router.get("/beneficiaries", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(beneficiariesTable)
    .where(eq(beneficiariesTable.userId, DEMO_USER_ID))
    .orderBy(desc(beneficiariesTable.trusted), desc(beneficiariesTable.transferCount));
  res.json(rows.map(mapBeneficiary));
});

router.post("/beneficiaries", async (req, res): Promise<void> => {
  const parsed = CreateBeneficiaryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "تحقق من بيانات المستفيد — الاسم والبنك ورقم الآيبان مطلوبة" });
    return;
  }
  const [row] = await db
    .insert(beneficiariesTable)
    .values({
      userId: DEMO_USER_ID,
      name: parsed.data.name,
      bank: parsed.data.bank,
      iban: parsed.data.iban,
      relationship: parsed.data.relationship ?? null,
    })
    .returning();
  res.status(201).json(mapBeneficiary(row));
});

export default router;
