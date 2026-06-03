import { Request, Response } from "express";

import { registerSchema, validateLoginInput } from "./auth.validator";
import { registerUser, loginUser, getCurrentUser } from "./auth.service";

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

export const login = async (req: Request, res: Response) => {
  try {
    validateLoginInput(req.body);

    const result = await loginUser(req.body);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const me = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await getCurrentUser(
      req.user!.userId
    );

    res.json(user);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};