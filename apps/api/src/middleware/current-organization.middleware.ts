import { NextFunction, Request, Response } from "express";

export const requireCurrentOrganization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const organizationId =
    req.user?.currentOrganizationId;

  if (!organizationId) {
    return res.status(400).json({
      message: "No organization selected",
    });
  }

  req.organizationId = organizationId;

  next();
};