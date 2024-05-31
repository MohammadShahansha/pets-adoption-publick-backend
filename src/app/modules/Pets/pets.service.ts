import { Pet, Prisma } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import prisma from "../../../shared/prisma";
import { petSearchFields } from "./pets.constant";
import { paginateHelpers } from "../../../helpers/paginationHelpers";
import { TPets } from "./pets.types";
import { jwtHelper } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const creatPets = async (token: string, payload: TPets) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);
  } catch (err) {
    throw new Error("Unauthorized Access");
  }

  const result = await prisma.pet.create({
    data: payload,
  });
  return result;
};

const getAllPet = async (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;

  const { page, limit, skip } = paginateHelpers.calculatePagination(options);
  const andCondition: Prisma.PetWhereInput[] = [];

  if (params.searchTerm) {
    andCondition.push({
      OR: petSearchFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.PetWhereInput = { AND: andCondition };
  const result = await prisma.pet.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.pet.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updatePet = async (
  token: string,
  petId: string,
  data: Partial<Pet>
): Promise<Pet> => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);
  } catch (err) {
    throw new Error("Unauthorized Access");
  }
  const result = await prisma.pet.update({
    where: {
      id: petId,
    },
    data,
  });
  return result;
};
const deletePet = async (token: string, petId: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);
  } catch (err) {
    throw new Error("Unauthorized Access");
  }
  const result = await prisma.$transaction(async (transectionClient) => {
    await transectionClient.adoptionRequest.deleteMany({
      where: {
        petId: petId,
      },
    });
    const petDelete = await transectionClient.pet.delete({
      where: {
        id: petId,
      },
    });

    return petDelete;
  });
  return result;
};
const getSinglePet = async (token: string, petId: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);
  } catch (err) {
    throw new Error("Unauthorized Access");
  }
  const result = await prisma.pet.findUniqueOrThrow({
    where: {
      id: petId,
    },
  });

  return result;
};

const availablePets = async () => {
  const pets = await prisma.pet.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const totalPets = await prisma.pet.count();

  return {
    pets,
    totalPets,
  };
};
export const petService = {
  creatPets,
  getAllPet,
  updatePet,
  deletePet,
  getSinglePet,
  availablePets,
};
