import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { jwtHelper } from "../../../helpers/jwtHelpers";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";

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
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const result = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    token: accessToken,
  };
  return result;
};

//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: user.email,
//       status: UserStatus.ACTIVE,
//     },
//   });
//   const isCorrectPassword: boolean = await bcrypt.compare(
//     payload.oldPassword,
//     userData.password
//   );

//   if (!isCorrectPassword) {
//     throw new Error("Password is not matche");
//   }
//   const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

//   await prisma.user.update({
//     where: {
//       email: userData.email,
//     },
//     data: {
//       password: hashedPassword,
//       needPasswordChange: false,
//     },
//   });
//   return {
//     message: "password  change successfully",
//   };
// };

// const forgetPassword = async (payload: { email: string }) => {
//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: payload.email,
//       status: UserStatus.ACTIVE,
//     },
//   });
//   const resetPasswordToken = jwtHelper.generateToken(
//     {
//       email: userData.email,
//       role: userData.role,
//     },
//     config.jwt.reset_token_secret as Secret,
//     config.jwt.reset_token_expires_in as string
//   );

//   const resetPasswordLink =
//     config.reset_password_link +
//     `?userId=${userData.id}&token=${resetPasswordToken}`;

//   console.log(resetPasswordLink);
// };
export const authService = {
  loginUser,
};
