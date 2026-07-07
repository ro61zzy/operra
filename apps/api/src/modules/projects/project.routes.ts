import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware";
import { requireCurrentOrganization } from "../../middleware/current-organization.middleware";

import {
  createProjectController,
  getProjectsController,
  getProjectController,
  updateProjectController,
  deleteProjectController,
} from "./project.controller";

import { validate } from "../../middleware/validation.middleware";

import {
    createProjectSchema,
    updateProjectSchema,
} from "./project.validation";

const router = Router();

router.post(
    "/",
    requireAuth,
    requireCurrentOrganization,
    validate(createProjectSchema),
    createProjectController
);

router.get(
  "/",
  requireAuth,
  requireCurrentOrganization,
  getProjectsController
);

router.get(
  "/:id",
  requireAuth,
  requireCurrentOrganization,
  getProjectController
);

router.patch(
    "/:id",
    requireAuth,
    requireCurrentOrganization,
    validate(updateProjectSchema),
    updateProjectController
);

router.delete(
  "/:id",
  requireAuth,
  requireCurrentOrganization,
  deleteProjectController
);

export default router;