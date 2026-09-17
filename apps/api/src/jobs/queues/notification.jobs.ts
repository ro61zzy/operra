import { notificationQueue } from "./notification.queue";

export const addTaskDueNotificationJob = async (
  taskId: string,
  userId: string
) => {
  await notificationQueue.add(
    "task-due",
    {
      taskId,
      userId,
    },
    {
      delay: 24 * 60 * 60 * 1000,
      removeOnComplete: true,
      removeOnFail: false,
    }
  );
};