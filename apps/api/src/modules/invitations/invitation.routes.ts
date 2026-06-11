import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware";
import { requireOrganizationRole } from "../../middleware/role.middleware";

import { createInvitation, acceptInvitationController, getInvitationController } from "./invitation.controller";

const router = Router();

router.post(
  "/:organizationId/invite",
  requireAuth,
  requireOrganizationRole(["OWNER"]),
  createInvitation
);
router.post(
  "/accept/:token",
  requireAuth,
  acceptInvitationController
);
router.get("/:token", getInvitationController);

export default router;