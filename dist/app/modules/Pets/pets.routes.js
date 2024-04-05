"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petRoutes = void 0;
const express_1 = __importDefault(require("express"));
const pets_controller_1 = require("./pets.controller");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const pets_validation_1 = require("./pets.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(pets_validation_1.petsValidationSchema.petsValidation), pets_controller_1.petController.createpet);
router.get("/", pets_controller_1.petController.getAllPet);
router.put("/:petId", pets_controller_1.petController.updatePet);
exports.petRoutes = router;
