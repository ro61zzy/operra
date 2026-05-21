import { Request, Response } from "express";

import { registerSchema } from "./auth.validator";
import { registerUser } from "./auth.service";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const result = await registerUser(validatedData);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};