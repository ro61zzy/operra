import { Request, Response } from "express";

import {
  createComment,
  getComments,
  updateComment,
  deleteComment
} from "./comment.service";

export const createCommentController = async (
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

    const comment = await createComment(
      taskId,
      req.organizationId!,
      req.user!.userId,
      req.body
    );

    res.status(201).json(comment);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getCommentsController = async (
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

    const comments = await getComments(
      taskId,
      req.organizationId!
    );

    res.json(comments);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateCommentController = async (
  req: Request,
  res: Response
) => {
  try {
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
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteCommentController = async (
  req: Request,
  res: Response
) => {
  try {
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
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};