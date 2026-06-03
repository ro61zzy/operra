
import { Request, Response } from "express";

import { inviteUser } from "./invitation.service"

export const createInvitation = async (
  req: Request,
  res: Response
) => {
  try {

    const organizationId = req.params.organizationId;

if (!organizationId) {
  return res.status(400).json({
    message: "Organization ID is required",
  });
}


    const invitation = await inviteUser(
      organizationId,
      req.user!.userId,
      req.body.email,
      req.body.role
    );

    res.status(201).json(invitation);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};