import { Request, Response } from "express";

import { getTaskTimeline } from "./task-timeline.service";

export const getTaskTimelineController = async (
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

    const timeline = await getTaskTimeline(
      taskId,
      req.organizationId!
    );

    res.json(timeline);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};