import express from "express";
import { authController } from "./auth.controller";
import auth from "../../../middleware/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.post("/login", authController.loginUser);
router.put(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.USER),
  authController.changePassword
);

export const authRouter = router;
