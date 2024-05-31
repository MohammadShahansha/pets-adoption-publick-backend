import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { jwtHelper } from "../../../helpers/jwtHelpers";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import { UserStatus } from "@prisma/client";

const loginUser = async (payloads: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payloads.email,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payloads.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is not matche");
  }
  const accessToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const result = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    token: accessToken,
  };
  return result;
};

const changePassword = async (
  user: JwtPayload | null,
  payloads: { oldPassword: string; newPassword: string }
) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
  });
  console.log(userData);
  const isCorrectPassword: boolean = await bcrypt.compare(
    payloads.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("password is not match");
  }
  const hashedPassword: string = await bcrypt.hash(payloads.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });
  return {
    message: "Password successfully changed",
  };
};

export const authService = {
  loginUser,
  changePassword,
};
