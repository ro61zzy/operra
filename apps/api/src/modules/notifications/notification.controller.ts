import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "./notification.service";

export const getNotificationsController = asyncHandler(
  async (req, res) => {
    const notifications = await getUserNotifications(
      req.user!.userId
    );

    res.json(notifications);
  }
);

export const markNotificationAsReadController =
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Notification ID is required",
      });
    }

    await markNotificationAsRead(
      id,
      req.user!.userId
    );

    res.json({
      message: "Notification marked as read",
    });
  });

export const markAllNotificationsAsReadController =
  asyncHandler(async (req, res) => {
    await markAllNotificationsAsRead(
      req.user!.userId
    );

    res.json({
      message: "All notifications marked as read",
    });
  });