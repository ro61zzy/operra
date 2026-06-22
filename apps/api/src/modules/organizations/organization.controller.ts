import { Request, Response } from "express";

import {
  getOrganizationById,
  getOrganizationMembers,
  getUserOrganizations,
  getCurrentOrganization,
  switchOrganization,
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
    const organizationId = req.params.id;

    if (!organizationId || Array.isArray(organizationId)) {
      return res.status(400).json({
        message: "Organization ID is required",
      });
    }

    const organization = await getOrganizationById(
      organizationId
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
    const organizationId = req.params.id;

    if (!organizationId || Array.isArray(organizationId)) {
      return res.status(400).json({
        message: "Organization ID is required",
      });
    }

    const members = await getOrganizationMembers(
      organizationId
    );

    res.json(members);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const currentOrganizationController = async (
  req: Request,
  res: Response
) => {
  try {
    const organization = await getCurrentOrganization(
      req.user!.userId
    );

    res.json(organization);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const switchOrganizationController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await switchOrganization(
      req.user!.userId,
      req.body.organizationId
    );

    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};