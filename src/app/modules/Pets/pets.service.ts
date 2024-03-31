import catchAsync from "../../../shared/catchAsync";
import prisma from "../../../shared/prisma";
type TPets = {
  name: string;
  species: string;
  breed: string;
  age: number;
  size: string;
  location: string;
  description: string;
  temperament: string;
  medicalHistory: string;
  adoptionRequirements: string;
};
const creatPets = async (payload: TPets) => {
  const result = await prisma.pet.create({
    data: payload,
  });
  return result;
};

export const petService = {
  creatPets,
};
