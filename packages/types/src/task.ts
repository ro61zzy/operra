export type CreateTaskInput = {
  title: string;
  description?: string;
  assigneeId?: string;
};

export type UpdateTaskInput = {
  title?: string;
  description?: string;
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  assigneeId?: string | null;
};