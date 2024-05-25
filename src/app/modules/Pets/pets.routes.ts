import express from "express";
import { petController } from "./pets.controller";
import validateRequest from "../../../middleware/validateRequest";
import { petsValidationSchema } from "./pets.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(petsValidationSchema.petsValidation),
  petController.createpet
);
router.get("/", petController.getAllPet);
router.put("/:petId", petController.updatePet);
router.delete("/:petId", petController.deletePet);
router.get("/:petId", petController.getSinglePet);
export const petRoutes = router;
