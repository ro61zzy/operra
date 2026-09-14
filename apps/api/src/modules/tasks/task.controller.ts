import { Request, Response } from "express";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
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
      req.organizationId!,
      {
        status: req.query.status as
          | "TODO"
          | "IN_PROGRESS"
          | "DONE"
          | undefined,

        priority: req.query.priority as
          | "LOW"
          | "MEDIUM"
          | "HIGH"
          | "URGENT"
          | undefined,

        assigneeId: req.query.assigneeId as
          | string
          | undefined,

        sortBy: req.query.sortBy as
          | "createdAt"
          | "dueDate"
          | "priority"
          | undefined,

        sortOrder: req.query.sortOrder as
          | "asc"
          | "desc"
          | undefined,

        page: Number(req.query.page) || 1,

        limit: Number(req.query.limit) || 10,
      }
    );

    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTaskController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Task ID is required",
      });
    }

   const task = await updateTask(
  id,
  req.organizationId!,
  req.user!.userId,
  req.body
);

    res.json(task);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteTaskController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Task ID is required",
      });
    }

    const result = await deleteTask(
      id,
      req.organizationId!
    );

    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateTaskStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Task ID is required",
      });
    }

    const task = await updateTaskStatus(
  id,
  req.organizationId!,
  req.user!.userId,
  req.body.status
);

    res.json(task);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};