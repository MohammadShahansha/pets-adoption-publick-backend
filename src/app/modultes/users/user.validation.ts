import { z } from "zod";

const userCreateValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  }),
});
export const userValidateRequest = {
  userCreateValidationSchema,
};