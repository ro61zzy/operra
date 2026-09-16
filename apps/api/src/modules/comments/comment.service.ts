import { prisma } from "../../config/prisma";
import {
  CreateCommentInput,
  UpdateCommentInput,
} from "@repo/types";
import { createActivity } from "../activities/activity.service";
import { createNotification } from "../notifications/notification.service";

export const createComment = async (
  taskId: string,
  organizationId: string,
  authorId: string,
  data: CreateCommentInput
) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      project: {
        organizationId,
      },
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  const comment = await prisma.comment.create({
    data: {
      content: data.content,
      taskId,
      authorId,
    },
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  if (data.mentionedUserIds?.length) {
  await Promise.all(
    data.mentionedUserIds.map((userId) =>
      createNotification({
        userId,
        type: "COMMENT_MENTION",
        message: `${comment.author.firstName ?? "Someone"} mentioned you in a comment`,
        taskId,
      })
    )
  );
}

  await createActivity({
    taskId,
    actorId: authorId,
    action: "COMMENTED",
  });

  return comment;
};

export const getComments = async (
  taskId: string,
  organizationId: string
) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      project: {
        organizationId,
      },
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return prisma.comment.findMany({
    where: { taskId },
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const updateComment = async (
  id: string,
  organizationId: string,
  authorId: string,
  data: UpdateCommentInput
) => {
  const comment = await prisma.comment.findFirst({
    where: {
      id,
      authorId,
      task: {
        project: {
          organizationId,
        },
      },
    },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  return prisma.comment.update({
    where: { id },
    data: {
      content: data.content,
    },
  });
};

export const deleteComment = async (
  id: string,
  organizationId: string,
  authorId: string
) => {
  const comment = await prisma.comment.findFirst({
    where: {
      id,
      authorId,
      task: {
        project: {
          organizationId,
        },
      },
    },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  await prisma.comment.delete({
    where: { id },
  });

  return {
    message: "Comment deleted",
  };
};