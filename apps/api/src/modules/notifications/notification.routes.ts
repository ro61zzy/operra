import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware";

import {
  getNotificationsController,
  markNotificationAsReadController,
  markAllNotificationsAsReadController,
} from "./notification.controller";

const router = Router();

router.get(
  "/",
  requireAuth,
  getNotificationsController
);

router.patch(
  "/read-all",
  requireAuth,
  markAllNotificationsAsReadController
);

router.patch(
  "/:id/read",
  requireAuth,
  markNotificationAsReadController
);

export default router;