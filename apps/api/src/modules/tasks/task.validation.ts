import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z.string().optional(),

  assigneeId: z.string().optional(),
});

export const updateTaskSchema =
  createTaskSchema.partial();

export const updateTaskStatusSchema = z.object({
  status: z.enum([
    "TODO",
    "IN_PROGRESS",
    "DONE",
  ]),
});
