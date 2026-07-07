import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from './config/prisma'

//import routes
import authRoutes from "./modules/auth/auth.routes";
import invitationRoutes from "./modules/invitations/invitation.routes"
import organizationRoutes from "./modules/organizations/organization.routes";
import projectRoutes from "./modules/projects/project.routes";
import taskRoutes from "./modules/tasks/task.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    service: "Operra API",
  });
});

const PORT = process.env.PORT || 3001;

app.get("/", (_, res) => {
  res.send("hello");
});



//api routes
app.use("/auth", authRoutes);
app.use(
  "/organizations",
  organizationRoutes
);
app.use(
  "/invitations",
  invitationRoutes
);
app.use("/projects", projectRoutes);
app.use("/", taskRoutes);

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});