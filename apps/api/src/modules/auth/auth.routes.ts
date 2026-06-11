import { Router } from "express";

import { register, login, me, registerFromInvite } from "./auth.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.post(
  "/register-from-invite",
  registerFromInvite
);

export default router;