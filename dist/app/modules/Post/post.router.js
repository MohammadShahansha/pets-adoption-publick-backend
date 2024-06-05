"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middleware/auth"));
const client_1 = require("@prisma/client");
const post_controller_1 = require("./post.controller");
const router = express_1.default.Router();
router.post("/create-post", (0, auth_1.default)(client_1.UserRole.ADMIN), post_controller_1.postController.createPost);
router.get("/get-post", post_controller_1.postController.getAllPost);
router.get("/get-single-post/:id", post_controller_1.postController.getSinglePost);
exports.postRoutes = router;
