"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get("/profile", user_controller_1.userController.getMe);
router.put("/profile", user_controller_1.userController.updateMe);
router.get("/get-users", user_controller_1.userController.getAllUsers);
router.put("/update-user/:id", user_controller_1.userController.updateUsers);
router.get("/find-user-status", user_controller_1.userController.getUsersDependOnStatus);
exports.userRoutes = router;
