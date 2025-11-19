import { Router } from "express";

import statusRoutes from "./status.routes";
import suggestionsRoutes from "./suggestions.routes";

const router = Router();

router.use("/status", statusRoutes);
router.use("/suggestions", suggestionsRoutes);

export default router;
