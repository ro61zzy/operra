import { Request, Response } from "express";

import {
  createTask,
  getTasks,
} from "./task.service";

export const createTaskController = async (
  req: Request,
  res: Response
) => {
  try {
    const projectId = req.params.projectId;

    if (!projectId || Array.isArray(projectId)) {
      return res.status(400).json({
        message: "Project ID is required",
      });
    }

    const task = await createTask(
      projectId,
      req.organizationId!,
      req.user!.userId,
      req.body
    );

    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getTasksController = async (
  req: Request,
  res: Response
) => {
  try {
    const projectId = req.params.projectId;

    if (!projectId || Array.isArray(projectId)) {
      return res.status(400).json({
        message: "Project ID is required",
      });
    }

    const tasks = await getTasks(
      projectId,
      req.organizationId!
    );

    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};