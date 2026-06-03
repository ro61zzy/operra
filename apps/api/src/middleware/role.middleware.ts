import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";

type AllowedRole = "OWNER" | "ADMIN" | "MEMBER";

export const requireOrganizationRole = (
  allowedRoles: AllowedRole[]
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const organizationId =
        req.params.id || req.params.organizationId;

      if (
  !organizationId ||
  Array.isArray(organizationId)
) {
  return res.status(400).json({
    message: "Invalid organization id",
  });
}

      const membership =
        await prisma.membership.findFirst({
          where: {
            organizationId,
            userId: req.user!.userId,
          },
        });

      if (!membership) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      if (
        !allowedRoles.includes(
          membership.role as AllowedRole
        )
      ) {
        return res.status(403).json({
          message: "Insufficient permissions",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  };
};