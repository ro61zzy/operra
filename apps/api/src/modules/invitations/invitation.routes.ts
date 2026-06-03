import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware";
import { requireOrganizationRole } from "../../middleware/role.middleware";

import { createInvitation } from "./invitation.controller";

const router = Router();

router.post(
  "/:organizationId/invite",
  requireAuth,
  requireOrganizationRole(["OWNER"]),
  createInvitation
);

export default router;