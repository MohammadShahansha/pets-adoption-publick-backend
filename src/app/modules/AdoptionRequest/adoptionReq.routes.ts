import express from "express";
import { adoptionReqController } from "./adoptionReq.controller";
const router = express.Router();

router.post("/adoption-request", adoptionReqController.createAdoptionReq);
router.get("/adoption-requests", adoptionReqController.getAllAdoptionReq);

export const adoptionReqRouter = router;
