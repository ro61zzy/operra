import { prisma } from "../../config/prisma";

type CreateActivityInput = {
  taskId: string;
  actorId: string;
  action:
    | "CREATED"
    | "UPDATED"
    | "ASSIGNED"
    | "UNASSIGNED"
    | "STATUS_CHANGED"
    | "COMMENTED"
    | "DELETED";
  oldValue?: string;
  newValue?: string;
};

export const createActivity = async (
  data: CreateActivityInput
) => {
  return prisma.activity.create({
    data,
  });
};

export const getTaskActivities = async (
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

  return prisma.activity.findMany({
    where: {
      taskId,
    },
    include: {
      actor: {
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