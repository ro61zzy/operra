import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../../config/prisma";
import { RegisterInput, LoginInput } from "@repo/types";

//register user service
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

  select: {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    createdAt: true,
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

//login user
export const loginUser = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },

    include: {
      memberships: {
        include: {
          organization: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

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
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,

      memberships: user.memberships.map((membership) => ({
        role: membership.role,
        organization: {
          id: membership.organization.id,
          name: membership.organization.name,
          slug: membership.organization.slug,
        },
      })),
    },

    token,
  };
};

//get whoami
export const getCurrentUser = async (
  userId: string
) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,

      memberships: {
        include: {
          organization: true,
        },
      },
    },
  });
};