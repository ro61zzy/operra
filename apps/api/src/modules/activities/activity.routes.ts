import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware";
import { requireCurrentOrganization } from "../../middleware/current-organization.middleware";

import {
  getTaskActivitiesController,
} from "./activity.controller";

const router = Router();

router.get(
  "/tasks/:taskId/activities",
  requireAuth,
  requireCurrentOrganization,
  getTaskActivitiesController
);

export default router;