import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";

export const requireOrganizationMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId = req.params.id;

   if (
  !organizationId ||
  Array.isArray(organizationId)
) {
  return res.status(400).json({
    message: "Invalid organization id",
  });
}

    const membership = await prisma.membership.findFirst({
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

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};