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

export type RegisterFromInviteInput = {
  token: string;
  firstName: string;
  lastName: string;
  password: string;
};