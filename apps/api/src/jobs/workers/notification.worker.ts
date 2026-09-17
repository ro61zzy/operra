import { Worker } from "bullmq";

import { redis } from "../../config/redis";
import { prisma } from "../../config/prisma";

export const notificationWorker =
  new Worker(
    "notifications",
    async (job) => {
      if (job.name === "task-due") {
        const { taskId, userId } = job.data;

        const task = await prisma.task.findUnique({
          where: {
            id: taskId,
          },
        });

        if (!task) {
          console.log(
            `Task ${taskId} no longer exists`
          );
          return;
        }

        await prisma.notification.create({
          data: {
            userId,
            taskId,
            type: "TASK_DUE",
            message: `Task "${task.title}" is due soon`,
          },
        });

        console.log(
          `Due notification created for task ${taskId}`
        );
      }
    },
    {
      connection: redis,
    }
  );

notificationWorker.on("completed", (job) => {
  console.log(
    `Job ${job.id} completed`
  );
});

notificationWorker.on("failed", (job, error) => {
  console.error(
    `Job ${job?.id} failed:`,
    error
  );
});