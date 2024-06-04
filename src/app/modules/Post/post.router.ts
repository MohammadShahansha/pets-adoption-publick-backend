import express from "express";
import auth from "../../../middleware/auth";
import { UserRole } from "@prisma/client";
import { postController } from "./post.controller";

const router = express.Router();

router.post("/create-post", auth(UserRole.ADMIN), postController.createPost);
router.get("/get-post", postController.getAllPost);
router.get("/get-single-post/:id", postController.getSinglePost);

export const postRoutes = router;
