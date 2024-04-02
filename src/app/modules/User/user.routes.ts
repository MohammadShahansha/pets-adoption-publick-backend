import express from "express";
import { userController } from "./user.controller";
const router = express.Router();

router.get("/", userController.getUser);
router.put("/", userController.updateUser);

export const userRoutes = router;
