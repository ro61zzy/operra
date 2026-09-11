export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "URGENT";

export type CreateTaskInput = {
  title: string;
  description?: string;
  assigneeId?: string;
  priority?: TaskPriority;
  dueDate?: string;
};

export type UpdateTaskInput = {
  title?: string;
  description?: string;
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  assigneeId?: string | null;
  priority?: TaskPriority;
  dueDate?: string | null;
};