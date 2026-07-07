import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(100),

  description: z
    .string()
    .optional(),
});

export const updateProjectSchema =
  createProjectSchema.partial();