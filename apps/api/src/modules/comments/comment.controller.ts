import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "./comment.service";

export const createCommentController = asyncHandler(
  async (req, res) => {
    const taskId = req.params.taskId;

    if (!taskId || Array.isArray(taskId)) {
      return res.status(400).json({
        message: "Task ID is required",
      });
    }

    const comment = await createComment(
      taskId,
      req.organizationId!,
      req.user!.userId,
      req.body
    );

    res.status(201).json(comment);
  }
);

export const getCommentsController = asyncHandler(
  async (req, res) => {
    const taskId = req.params.taskId;

    if (!taskId || Array.isArray(taskId)) {
      return res.status(400).json({
        message: "Task ID is required",
      });
    }

    const comments = await getComments(
      taskId,
      req.organizationId!
    );

    res.json(comments);
  }
);

export const updateCommentController = asyncHandler(
  async (req, res) => {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Comment ID is required",
      });
    }

    const comment = await updateComment(
      id,
      req.organizationId!,
      req.user!.userId,
      req.body
    );

    res.json(comment);
  }
);

export const deleteCommentController = asyncHandler(
  async (req, res) => {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Comment ID is required",
      });
    }

    const result = await deleteComment(
      id,
      req.organizationId!,
      req.user!.userId
    );

    res.json(result);
  }
);