import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from './config/prisma'

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

app.get("/users", async (_, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});