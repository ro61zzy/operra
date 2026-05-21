import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../../config/prisma";
import { RegisterInput } from "@repo/types";


export const registerUser = async (data: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const slug = data.organizationName
    .toLowerCase()
    .replace(/\s+/g, "-");

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,

      memberships: {
        create: {
          role: "OWNER",

          organization: {
            create: {
              name: data.organizationName,
              slug,
            },
          },
        },
      },
    },
  });

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    user,
    token,
  };
};