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
    priority: data.priority,
    dueDate: data.dueDate
      ? new Date(data.dueDate)
      : undefined,
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
  organizationId: string,
  filters: {
    status?: "TODO" | "IN_PROGRESS" | "DONE";
    priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    assigneeId?: string;
    sortBy?: "createdAt" | "dueDate" | "priority";
    sortOrder?: "asc" | "desc";
    page?: number;
    limit?: number;
  }
) => {
  await findProject(projectId, organizationId);

  const page = filters.page ?? 1;
  const limit = filters.limit ?? 10;
  const skip = (page - 1) * limit;

  const where = {
    projectId,
    ...(filters.status && {
      status: filters.status,
    }),
    ...(filters.priority && {
      priority: filters.priority,
    }),
    ...(filters.assigneeId && {
      assigneeId: filters.assigneeId,
    }),
  };

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
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
        [filters.sortBy ?? "createdAt"]:
          filters.sortOrder ?? "desc",
      },
      skip,
      take: limit,
    }),

    prisma.task.count({
      where,
    }),
  ]);

  return {
    tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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
      data: {
    ...data,
    dueDate:
      data.dueDate === undefined
        ? undefined
        : data.dueDate === null
          ? null
          : new Date(data.dueDate),
  },
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
  organizationId: string,
  userId: string
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

  await createActivity({
    taskId: task.id,
    actorId: userId,
    action: "DELETED",
  });

  await prisma.task.delete({
    where: { id },
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