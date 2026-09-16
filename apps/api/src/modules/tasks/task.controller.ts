import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "./task.service";

export const createTaskController = asyncHandler(
  async (req, res) => {
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
  }
);

export const getTasksController = asyncHandler(
  async (req, res) => {
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
  }
);

export const updateTaskController = asyncHandler(
  async (req, res) => {
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
  }
);

export const deleteTaskController = asyncHandler(
  async (req, res) => {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Task ID is required",
      });
    }

   const result = await deleteTask(
  id,
  req.organizationId!,
  req.user!.userId
);

    res.json(result);
  }
);

export const updateTaskStatusController = asyncHandler(
  async (req, res) => {
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
  }
);