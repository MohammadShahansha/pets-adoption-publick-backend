import { Gender, PetSize } from "@prisma/client";

export type TPets = {
  name: string;
  species: string;
  breed: string;
  age: number;
  size: PetSize;
  gender: Gender;
  location: string;
  specialNeeds: string;
  image: string;
  helthStatus: string;
  description: string;
  temperament: string;
  medicalHistory: string;
  adoptionRequirements: string;
};
