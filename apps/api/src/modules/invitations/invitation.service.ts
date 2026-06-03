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