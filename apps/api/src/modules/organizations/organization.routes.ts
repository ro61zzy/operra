import { Router } from "express";

import {
  getMembers,
  getOrganization,
  getOrganizations,
} from "./organization.controller";

import { requireAuth } from "../../middleware/auth.middleware";
import { requireOrganizationMember } from "../../middleware/organization.middleware";

const router = Router();

router.get(
  "/",
  requireAuth,
  getOrganizations
);

router.get(
  "/:id",
  requireAuth,
  requireOrganizationMember,
  getOrganization
);

router.get(
  "/:id/members",
  requireAuth,
  requireOrganizationMember,
  getMembers
);

export default router;