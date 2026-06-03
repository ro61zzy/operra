import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (
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
  !decoded ||
  !("userId" in decoded)
) {
  return res.status(401).json({
    message: "Invalid token",
  });
}

req.user = {
  userId: decoded.userId,
  email: decoded.email,
};

next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};