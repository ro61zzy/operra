import { Request, Response } from "express";

import {
  getOrganizationById,
  getOrganizationMembers,
  getUserOrganizations,
} from "./organization.service";

export const getOrganizations = async (
  req: Request,
  res: Response
) => {
  try {
    const organizations =
      await getUserOrganizations(
        req.user!.userId
      );

    res.json(organizations);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOrganization = async (
  req: Request,
  res: Response
) => {
  try {
    const organization =
      await getOrganizationById(
        req.params.id
      );

    res.json(organization);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMembers = async (
  req: Request,
  res: Response
) => {
  try {
    const members =
      await getOrganizationMembers(
        req.params.id
      );

    res.json(members);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};