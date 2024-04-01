import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelper } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { TAdoptionReq } from "./adoptionReqTypes";

const createAdoptionReq = async (token: string, payload: TAdoptionReq) => {
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
  const adoptionReqData = {
    userId: isUserExist.id,
    petId: payload.petId,
    petOwnershipExperience: payload.petOwnershipExperience,
  };
  const result = await prisma.adoptionRequest.create({
    data: adoptionReqData,
  });
  return result;
};

const getAllAdoptionReq = async () => {
  const result = await prisma.adoptionRequest.findMany();
  return result;
};
export const adoptionReqService = {
  createAdoptionReq,
  getAllAdoptionReq,
};
