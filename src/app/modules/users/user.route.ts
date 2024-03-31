import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../../middleware/validateRequest";
import { userValidateRequest } from "./user.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(userValidateRequest.userCreateValidationSchema),
  userController.createUser
);
export const userRoutes = router;
