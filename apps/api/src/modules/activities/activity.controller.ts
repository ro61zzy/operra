import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import { getTaskActivities } from "./activity.service";

export const getTaskActivitiesController = asyncHandler(
  async (req, res) => {
    const taskId = req.params.taskId;

    if (!taskId || Array.isArray(taskId)) {
      return res.status(400).json({
        message: "Task ID is required",
      });
    }

    const activities = await getTaskActivities(
      taskId,
      req.organizationId!
    );

    res.json(activities);
  }
);