import express from "express";
import { registrationController } from "./register.controller";
import validateRequest from "../../../middleware/validateRequest";
import { userValidateRequest } from "./register.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(userValidateRequest.userCreateValidationSchema),
  registrationController.createUser
);
export const registerRoutes = router;
