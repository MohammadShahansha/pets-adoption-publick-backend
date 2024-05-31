import express from "express";
import { petController } from "./pets.controller";
import validateRequest from "../../../middleware/validateRequest";
import { petsValidationSchema } from "./pets.validation";

const router = express.Router();

router.post(
  "/pets",
  validateRequest(petsValidationSchema.petsValidation),
  petController.createpet
);
router.get("/pets", petController.getAllPet);
router.put("/pets/:petId", petController.updatePet);
router.delete("/pets/:petId", petController.deletePet);
router.get("/pets/:petId", petController.getSinglePet);
router.get("/availavle-pets", petController.availablePets);
export const petRoutes = router;
