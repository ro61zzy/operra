import { prisma } from "../../config/prisma";

export const getUserOrganizations = async (
  userId: string
) => {
  return prisma.membership.findMany({
    where: {
      userId,
    },

    select: {
      role: true,

      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
};

export const getOrganizationById = async (
  organizationId: string
) => {
  return prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });
};

export const getOrganizationMembers = async (
  organizationId: string
) => {
  return prisma.membership.findMany({
    where: {
      organizationId,
    },

    select: {
      role: true,

      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};


export const getCurrentOrganization = async (
  userId: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      currentOrganization: true,
    },
  });

  if (!user?.currentOrganization) {
    throw new Error("No current organization selected");
  }

  return user.currentOrganization;
};

export const switchOrganization = async (
  userId: string,
  organizationId: string
) => {
  const membership = await prisma.membership.findFirst({
    where: {
      userId,
      organizationId,
    },
  });

  if (!membership) {
    throw new Error(
      "You are not a member of this organization"
    );
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      currentOrganizationId: organizationId,
    },
  });

  return {
    message: "Organization switched successfully",
  };
};