import { UserRole, UserStatus } from "@prisma/client";

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: UserStatus;
};
