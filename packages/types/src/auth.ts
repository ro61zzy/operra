export type RegisterInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationName: string;
};

export type LoginInput = {
  email: string;
  password: string;
};