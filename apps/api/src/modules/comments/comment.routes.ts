import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware";
import { requireCurrentOrganization } from "../../middleware/current-organization.middleware";
import { validate } from "../../middleware/validation.middleware";

import {
  createCommentController,
  getCommentsController,
  updateCommentController,
  deleteCommentController
} from "./comment.controller";

import {
  createCommentSchema,
  updateCommentSchema
} from "./comment.validation";

const router = Router();

router.post(
  "/tasks/:taskId/comments",
  requireAuth,
  requireCurrentOrganization,
  validate(createCommentSchema),
  createCommentController
);

router.get(
  "/tasks/:taskId/comments",
  requireAuth,
  requireCurrentOrganization,
  getCommentsController
);

router.patch(
  "/comments/:id",
  requireAuth,
  requireCurrentOrganization,
  validate(updateCommentSchema),
  updateCommentController
);

router.delete(
  "/comments/:id",
  requireAuth,
  requireCurrentOrganization,
  deleteCommentController
);

export default router;