import { z } from "zod";

const adoptionReqVaildation = z.object({
  body: z.object({
    petId: z.string(),
    petOwnershipExperience: z.string(),
  }),
});
export const adoptionReqVaildationSchema = {
  adoptionReqVaildation,
};
