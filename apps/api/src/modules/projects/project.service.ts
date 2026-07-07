import { prisma } from "../../config/prisma";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "@repo/types";

export const createProject = async (
  organizationId: string,
  userId: string,
  data: CreateProjectInput
) => {
  return prisma.project.create({
    data: {
      name: data.name,
      description: data.description,

      organizationId,
      createdById: userId,
    },
  });
};

export const getProjects = async (
  organizationId: string
) => {
  return prisma.project.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProject = async (
  id: string,
  organizationId: string
) => {
  return prisma.project.findFirst({
    where: {
      id,
      organizationId,
    },
  });
};

export const updateProject = async (
  id: string,
  organizationId: string,
  data: UpdateProjectInput
) => {
const project = await prisma.project.findFirst({
  where: {
    id,
    organizationId,
  },
});

if (!project) {
  throw new Error("Project not found");
}

  return prisma.project.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteProject = async (
  id: string,
  organizationId: string
) => {
  const project = await prisma.project.findFirst({
  where: {
    id,
    organizationId,
  },
});

if (!project) {
  throw new Error("Project not found");
}

await prisma.project.delete({
  where: {
    id,
  },
});

  return {
    message: "Project deleted",
  };
};