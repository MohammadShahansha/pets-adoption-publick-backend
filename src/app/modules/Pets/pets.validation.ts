import { z } from "zod";

const petsValidation = z.object({
  body: z.object({
    name: z.string(),
    species: z.string(),
    breed: z.string(),
    age: z.number(),
    size: z.string(),
    location: z.string(),
    description: z.string(),
    temperament: z.string(),
    medicalHistory: z.string(),
    adoptionRequirements: z.string(),
  }),
});
export const petsValidationSchema = {
  petsValidation,
};
