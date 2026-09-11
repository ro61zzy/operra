import { prisma } from "../../config/prisma";
import {
  CreateTaskInput,
  UpdateTaskInput,
} from "@repo/types";
import { createActivity } from "../activities/activity.service";
import { AppError } from "../../utils/AppError";

const findProject = async (
  projectId: string,
  organizationId: string
) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      organizationId,
    },
  });

  if (!project) {
  throw new AppError(
    "Project not found",
    404
  );
}

  return project;
};

export const createTask = async (
  projectId: string,
  organizationId: string,
  userId: string,
  data: CreateTaskInput
) => {
  await findProject(projectId, organizationId);

  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      assigneeId: data.assigneeId,
      projectId,
      createdById: userId,
    },
  });

  await createActivity({
    taskId: task.id,
    actorId: userId,
    action: "CREATED",
  });

  return task;
};

export const getTasks = async (
  projectId: string,
  organizationId: string
) => {
  await findProject(projectId, organizationId);

  return prisma.task.findMany({
    where: {
      projectId,
    },
    include: {
      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateTask = async (
  id: string,
  organizationId: string,
  userId: string,
  data: UpdateTaskInput
) => {
  const task = await prisma.task.findFirst({
    where: {
      id,
      project: {
        organizationId,
      },
    },
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data,
  });

  if (
    data.assigneeId !== undefined &&
    data.assigneeId !== task.assigneeId
  ) {
    await createActivity({
      taskId: id,
      actorId: userId,
      action: data.assigneeId
        ? "ASSIGNED"
        : "UNASSIGNED",
      oldValue: task.assigneeId ?? undefined,
      newValue: data.assigneeId ?? undefined,
    });
  }

  return updatedTask;
};

export const deleteTask = async (
  id: string,
  organizationId: string
) => {
  const task = await prisma.task.findFirst({
    where: {
      id,
      project: {
        organizationId,
      },
    },
  });

  if (!task) {
    throw new AppError(
      "Task not found",
      404
    );
  }

  await prisma.task.delete({
    where: {
      id,
    },
  });

  return {
    message: "Task deleted",
  };
};

export const updateTaskStatus = async (
  id: string,
  organizationId: string,
  userId: string,
  status: "TODO" | "IN_PROGRESS" | "DONE"
) => {
  const task = await prisma.task.findFirst({
    where: {
      id,
      project: {
        organizationId,
      },
    },
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data: { status },
  });

  await createActivity({
    taskId: id,
    actorId: userId,
    action: "STATUS_CHANGED",
    oldValue: task.status,
    newValue: status,
  });

  return updatedTask;
};