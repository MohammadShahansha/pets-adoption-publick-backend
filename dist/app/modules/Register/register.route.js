"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const register_controller_1 = require("./register.controller");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const register_validation_1 = require("./register.validation");
const router = express_1.default.Router();
router.post("/register", (0, validateRequest_1.default)(register_validation_1.userValidateRequest.userCreateValidationSchema), register_controller_1.registrationController.createUser);
exports.registerRoutes = router;
