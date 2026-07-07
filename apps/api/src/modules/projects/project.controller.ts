import { Request, Response } from "express";

import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "./project.service";

export const createProjectController = async (
  req: Request,
  res: Response
) => {
  try {
    const organizationId = req.user?.currentOrganizationId;

    if (!organizationId) {
      return res.status(400).json({
        message: "No organization selected",
      });
    }

    const project = await createProject(
      organizationId,
      req.user!.userId,
      req.body
    );

    res.status(201).json(project);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getProjectsController = async (
  req: Request,
  res: Response
) => {
  try {
    const organizationId = req.user?.currentOrganizationId;

    if (!organizationId) {
      return res.status(400).json({
        message: "No organization selected",
      });
    }

    const projects = await getProjects(organizationId);

    res.json(projects);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProjectController = async (
  req: Request,
  res: Response
) => {
  try {
    const organizationId = req.user?.currentOrganizationId;

    const id = req.params.id;

    if (
      !organizationId ||
      !id ||
      Array.isArray(id)
    ) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    const project = await getProject(
      id,
      organizationId
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProjectController = async (
  req: Request,
  res: Response
) => {
  try {
    const organizationId = req.user?.currentOrganizationId;

    const id = req.params.id;

    if (
      !organizationId ||
      !id ||
      Array.isArray(id)
    ) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    const project = await updateProject(
      id,
      organizationId,
      req.body
    );

    res.json(project);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteProjectController = async (
  req: Request,
  res: Response
) => {
  try {
    const organizationId = req.user?.currentOrganizationId;

    const id = req.params.id;

    if (
      !organizationId ||
      !id ||
      Array.isArray(id)
    ) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    const result = await deleteProject(
      id,
      organizationId
    );

    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};