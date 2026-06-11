
import { Request, Response } from "express";

import { inviteUser, acceptInvitation, getInvitation } from "./invitation.service"

export const createInvitation = async (
  req: Request,
  res: Response
) => {
  try {

    const organizationId = req.params.organizationId;
if (
  !organizationId ||
  Array.isArray(organizationId)
) {
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

export const acceptInvitationController = async (
  req: Request,
  res: Response
) => {
  try {
    const token = req.params.token;

    if (!token || Array.isArray(token)) {
      return res.status(400).json({
        message: "Token required",
      });
    }

    const result = await acceptInvitation(
      token,
      req.user!.userId
    );

    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const getInvitationController = async (
  req: Request,
  res: Response
) => {
  try {
    const token = req.params.token;

    if (!token || Array.isArray(token)) {
      return res.status(400).json({
        message: "Token required",
      });
    }

    const invitation = await getInvitation(token);

    res.json(invitation);
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};