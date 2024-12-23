import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const createUser = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);
  const userData = {
    name: data.name,
    email: data.email,
    role: data.role,
    password: hashedPassword,
    photo: data?.photo,
  };

  const result = await prisma.user.create({
    data: userData,
  });
  return result;
};

export const registrationService = {
  createUser,
};
