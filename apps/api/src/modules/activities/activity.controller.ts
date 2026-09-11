import { Request, Response } from "express";

import { getTaskActivities } from "./activity.service";

export const getTaskActivitiesController = async (
  req: Request,
  res: Response
) => {
  try {
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
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};