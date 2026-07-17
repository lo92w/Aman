import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import dashboardRouter from "./dashboard";
import beneficiariesRouter from "./beneficiaries";
import transfersRouter from "./transfers";
import notificationsRouter from "./notifications";
import securityRouter from "./security";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(dashboardRouter);
router.use(beneficiariesRouter);
router.use(transfersRouter);
router.use(notificationsRouter);
router.use(securityRouter);

export default router;
