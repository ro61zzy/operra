import { prisma } from "../../config/prisma";
import {
  CreateTaskInput,
  UpdateTaskInput,
} from "@repo/types";

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
    throw new Error("Project not found");
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

  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,

      assigneeId: data.assigneeId,
      projectId,
      createdById: userId,
    },
  });
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