import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelper } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { User } from "@prisma/client";
import { TUser } from "./types";

const getMe = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);
  } catch (err) {
    throw new Error("You are not authorized");
  }
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });
  const { id, name, email, createdAt, updatedAt } = isUserExist;
  const result = {
    id,
    name,
    email,
    createdAt,
    updatedAt,
  };
  return result;
};

const updateMe = async (token: string, data: Partial<User>): Promise<User> => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);
  } catch (err) {
    throw new Error("You are not authorized");
  }
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: isUserExist.id,
    },
    data,
  });

  return result;
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};
const updateUsers = async (id: string, data: TUser) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};
const deleteUser = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return result;
};
export const userService = {
  getMe,
  updateMe,
  getAllUsers,
  updateUsers,
  deleteUser,
};
