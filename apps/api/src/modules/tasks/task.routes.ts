import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware";
import { requireCurrentOrganization } from "../../middleware/current-organization.middleware";

import {
  createTaskController,
  getTasksController,
} from "./task.controller";

const router = Router();

router.post(
  "/projects/:projectId/tasks",
  requireAuth,
  requireCurrentOrganization,
  createTaskController
);

router.get(
  "/projects/:projectId/tasks",
  requireAuth,
  requireCurrentOrganization,
  getTasksController
);

export default router;