import express from "express";
import { adoptionReqController } from "./adoptionReq.controller";
import validateRequest from "../../../middleware/validateRequest";
import { adoptionReqVaildationSchema } from "./adoptionReq.validation";
const router = express.Router();

router.post(
  "/adoption-request",
  validateRequest(adoptionReqVaildationSchema.adoptionReqVaildation),
  adoptionReqController.createAdoptionReq
);
router.get("/adoption-requests", adoptionReqController.getAllAdoptionReq);
router.put(
  "/adoption-requests/:requestId",
  adoptionReqController.updateAdoptionReq
);

export const adoptionReqRouter = router;
