import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";

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
    const project = await createProject(
      req.organizationId!,
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
    const projects = await getProjects(
      req.organizationId!
    );

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
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Invalid project id",
      });
    }

    const project = await getProject(
      id,
      req.organizationId!
    );

   if (!project) {
  throw new AppError(
    "Project not found",
    404
  );
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
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Invalid project id",
      });
    }

    const project = await updateProject(
      id,
      req.organizationId!,
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
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Invalid project id",
      });
    }

    const result = await deleteProject(
      id,
      req.organizationId!
    );

    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};