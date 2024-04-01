import { Pet, Prisma } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import prisma from "../../../shared/prisma";
import { petSearchFields } from "./pets.constant";
import { paginateHelpers } from "../../../helpers/paginationHelpers";
import { TPets } from "./pets.types";

const creatPets = async (payload: TPets) => {
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
const updatePet = async (petId: string, data: Partial<Pet>): Promise<Pet> => {
  const result = await prisma.pet.update({
    where: {
      id: petId,
    },
    data,
  });
  return result;
};
export const petService = {
  creatPets,
  getAllPet,
  updatePet,
};
