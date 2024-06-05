import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelper } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { TAdoptionReq } from "./adoptionReqTypes";
import { AdoptionRequest, RequestStatus } from "@prisma/client";

const createAdoptionReq = async (token: string, payload: TAdoptionReq) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);
  } catch (err) {
    throw new Error("Unauthorized Access");
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

const getAllAdoptionReq = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);
  } catch (err) {
    throw new Error("Unauthorized Access");
  }

  const result = await prisma.adoptionRequest.findMany({
    include: {
      pet: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};
const getUserAdoptionReq = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);
  } catch (err) {
    throw new Error("Unauthorized Access");
  }
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });
  const result = await prisma.adoptionRequest.findMany({
    where: {
      userId: isUserExist.id,
    },
    include: {
      pet: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const updateAdoptionReq = async (
  token: string,
  requestId: string,
  payload: Partial<AdoptionRequest>
): Promise<AdoptionRequest> => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);
  } catch (err) {
    throw new Error("Unauthorized Access");
  }

  const result = await prisma.adoptionRequest.update({
    where: {
      id: requestId,
    },
    data: payload,
  });
  console.log("result:", result, "reqId:", requestId, "payload:", payload);
  return result;
};

const deleteAdoptionReq = async (token: string, requestId: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);
  } catch (err) {
    throw new Error("Unauthorized Access");
  }
  const result = await prisma.adoptionRequest.delete({
    where: {
      id: requestId,
    },
  });
  return result;
};

//for dashboard -----------------------------------------

const getAdoptionRequestStatus = async () => {
  const totalRequest = await prisma.adoptionRequest.count();
  const approvedRequest = await prisma.adoptionRequest.count({
    where: {
      status: RequestStatus.APPROVED,
    },
  });
  const pendingRequest = await prisma.adoptionRequest.count({
    where: {
      status: RequestStatus.PENDING,
    },
  });
  const rejectedRequest = await prisma.adoptionRequest.count({
    where: {
      status: RequestStatus.REJECTED,
    },
  });

  return { totalRequest, approvedRequest, pendingRequest, rejectedRequest };
};
export const adoptionReqService = {
  createAdoptionReq,
  getAllAdoptionReq,
  getUserAdoptionReq,
  updateAdoptionReq,
  deleteAdoptionReq,
  getAdoptionRequestStatus,
};
