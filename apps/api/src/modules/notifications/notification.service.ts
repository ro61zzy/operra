import { prisma } from "../../config/prisma";

type CreateNotificationInput = {
  userId: string;
  type:
    | "TASK_ASSIGNED"
    | "COMMENT_MENTION"
    | "TASK_DUE";
  message: string;
  taskId?: string;
};

export const createNotification = async (
  data: CreateNotificationInput
) => {
  return prisma.notification.create({
    data,
  });
};

export const getUserNotifications = async (
  userId: string
) => {
  return prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const markNotificationAsRead = async (
  id: string,
  userId: string
) => {
  return prisma.notification.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      read: true,
    },
  });
};

export const markAllNotificationsAsRead = async (
  userId: string
) => {
  return prisma.notification.updateMany({
    where: {
      userId,
      read: false,
    },
    data: {
      read: true,
    },
  });
};