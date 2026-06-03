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