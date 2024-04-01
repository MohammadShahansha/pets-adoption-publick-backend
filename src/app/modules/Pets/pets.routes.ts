import express from "express";
import { petController } from "./pets.controller";

const router = express.Router();

router.post("/", petController.createpet);
router.get("/", petController.getAllPet);
export const petRoutes = router;
