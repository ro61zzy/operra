import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { prisma } from "../config/prisma";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    if (
      typeof decoded === "string" ||
      !("userId" in decoded)
    ) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        email: true,
        currentOrganizationId: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = {
      userId: user.id,
      email: user.email,
      currentOrganizationId:
        user.currentOrganizationId,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};