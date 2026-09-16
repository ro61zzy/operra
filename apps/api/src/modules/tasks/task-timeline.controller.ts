import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import { getTaskTimeline } from "./task-timeline.service";

export const getTaskTimelineController = asyncHandler(
  async (req, res) => {
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
  }
);