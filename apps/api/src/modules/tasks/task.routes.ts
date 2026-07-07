import { Router } from "express";
import { validate } from "../../middleware/validation.middleware";
import { requireAuth } from "../../middleware/auth.middleware";
import { requireCurrentOrganization } from "../../middleware/current-organization.middleware";

import {
  createTaskController,
  getTasksController,
  updateTaskController,
  deleteTaskController,
  updateTaskStatusController,
} from "./task.controller";

import {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
} from "./task.validation";

import { createTask } from "./task.service";

const router = Router();

router.post(
  "/projects/:projectId/tasks",
  requireAuth,
  requireCurrentOrganization,
  validate(createTaskSchema),
  createTaskController
);

router.get(
  "/projects/:projectId/tasks",
  requireAuth,
  requireCurrentOrganization,
  getTasksController
);

router.patch(
  "/tasks/:id",
  requireAuth,
  requireCurrentOrganization,
  validate(updateTaskSchema),
  updateTaskController
);

router.delete(
  "/tasks/:id",
  requireAuth,
  requireCurrentOrganization,
  deleteTaskController
);

router.patch(
  "/tasks/:id/status",
  requireAuth,
  requireCurrentOrganization,
  validate(updateTaskStatusSchema),
  updateTaskStatusController
);

export default router;