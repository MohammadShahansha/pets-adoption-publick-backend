"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionReqRouter = void 0;
const express_1 = __importDefault(require("express"));
const adoptionReq_controller_1 = require("./adoptionReq.controller");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const adoptionReq_validation_1 = require("./adoptionReq.validation");
const router = express_1.default.Router();
router.post("/adoption-request", (0, validateRequest_1.default)(adoptionReq_validation_1.adoptionReqVaildationSchema.adoptionReqVaildation), adoptionReq_controller_1.adoptionReqController.createAdoptionReq);
router.get("/adoption-requests", adoptionReq_controller_1.adoptionReqController.getAllAdoptionReq);
router.get("/user-adoption-requests", adoptionReq_controller_1.adoptionReqController.getUserAdoptionReq);
router.put("/adoption-requests/:requestId", adoptionReq_controller_1.adoptionReqController.updateAdoptionReq);
router.delete("/adoption-request/:requestId", adoptionReq_controller_1.adoptionReqController.deleteAdoptionReq);
router.get("/adoption-request-status", adoptionReq_controller_1.adoptionReqController.getAdoptionRequestStatus);
exports.adoptionReqRouter = router;
