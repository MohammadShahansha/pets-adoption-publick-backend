import express from "express";
import { userController } from "./user.controller";
const router = express.Router();

router.get("/profile", userController.getMe);
router.put("/profile", userController.updateMe);

router.get("/get-users", userController.getAllUsers);
router.put("/update-user/:id", userController.updateUsers);
router.delete("/delete-user/:id", userController.deleteUsers);
router.get("/find-user-status", userController.getUsersDependOnStatus);
export const userRoutes = router;
