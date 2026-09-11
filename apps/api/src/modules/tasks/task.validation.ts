import { z } from "zod";

const taskPrioritySchema = z.enum([
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
]);

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  assigneeId: z.string().optional(),
  priority: taskPrioritySchema.optional(),
  dueDate: z.string().datetime().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export const updateTaskStatusSchema = z.object({
  status: z.enum([
    "TODO",
    "IN_PROGRESS",
    "DONE",
  ]),
});