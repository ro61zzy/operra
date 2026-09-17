import { notificationQueue } from "./notification.queue";

export const addTaskDueNotificationJob = async (
  taskId: string,
  userId: string,
  dueDate: Date
) => {
  const now = Date.now();

  const notificationTime =
    dueDate.getTime() - 24 * 60 * 60 * 1000;

  const delay = Math.max(
    notificationTime - now,
    0
  );

  await notificationQueue.add(
    "task-due",
    {
      taskId,
      userId,
    },
    {
      delay,
      removeOnComplete: true,
      removeOnFail: false,
    }
  );
};