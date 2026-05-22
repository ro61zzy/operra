import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  organizationName: z.string().min(2),
});

export const validateLoginInput = (data: any) => {
  if (!data.email || !data.password) {
    throw new Error("Email and password are required");
  }
};