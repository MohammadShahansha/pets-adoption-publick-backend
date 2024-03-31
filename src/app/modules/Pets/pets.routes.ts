import express from "express";
import { petController } from "./pets.controller";

const router = express.Router();

router.post("/", petController.createpet);
export const petRoutes = router;
