import crypto from "crypto";

import { prisma } from "../../config/prisma";

export const inviteUser = async (
  organizationId: string,
  invitedById: string,
  email: string,
  role: "ADMIN" | "MEMBER"
) => {
  const token = crypto.randomUUID();

  return prisma.invitation.create({
    data: {
      email,
      role,
      token,

      organizationId,
      invitedById,
    },
  });
};

export const acceptInvitation = async (
  token: string,
  userId: string
) => {
  const invitation = await prisma.invitation.findUnique({
    where: {
      token,
    },
  });

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  if (invitation.accepted) {
    throw new Error("Invitation already accepted");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Optional safety check
  if (user.email !== invitation.email) {
    throw new Error(
      "This invitation belongs to another email address"
    );
  }

  // Prevent duplicate memberships
  const existingMembership =
    await prisma.membership.findFirst({
      where: {
        userId,
        organizationId: invitation.organizationId,
      },
    });

  if (!existingMembership) {
    await prisma.membership.create({
      data: {
        userId,
        organizationId: invitation.organizationId,
        role: invitation.role,
      },
    });
  }

  await prisma.invitation.update({
    where: {
      id: invitation.id,
    },
    data: {
      accepted: true,
    },
  });

  return {
    message: "Invitation accepted",
  };
};

export const getInvitation = async (
  token: string
) => {
  const invitation = await prisma.invitation.findUnique({
    where: {
      token,
    },
    include: {
      organization: true,
    },
  });

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  return {
    email: invitation.email,
    role: invitation.role,
    accepted: invitation.accepted,
    organization: invitation.organization.name,
  };
};