import { prisma } from "../../config/prisma";

export const getTaskTimeline = async (
  taskId: string,
  organizationId: string
) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      project: {
        organizationId,
      },
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  const [comments, activities] = await Promise.all([
    prisma.comment.findMany({
      where: { taskId },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    }),

    prisma.activity.findMany({
      where: { taskId },
      include: {
        actor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    }),
  ]);

  return [
    ...comments.map((comment) => ({
      type: "COMMENT" as const,
      id: comment.id,
      createdAt: comment.createdAt,
      data: comment,
    })),

    ...activities.map((activity) => ({
      type: "ACTIVITY" as const,
      id: activity.id,
      createdAt: activity.createdAt,
      data: activity,
    })),
  ].sort(
    (a, b) =>
      a.createdAt.getTime() - b.createdAt.getTime()
  );
};