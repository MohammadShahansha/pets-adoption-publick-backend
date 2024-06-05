"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middleware/auth"));
const client_1 = require("@prisma/client");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post("/create-review", (0, auth_1.default)(client_1.UserRole.USER), review_controller_1.reviewsController.createReview);
router.get("/get-reviews", 
// auth(UserRole.ADMIN),
review_controller_1.reviewsController.getAllReviews);
router.put("/update-review/:reviewId", (0, auth_1.default)(client_1.UserRole.ADMIN), review_controller_1.reviewsController.updateReview);
router.get("/home-reviews", 
// auth(UserRole.ADMIN, UserRole.USER),
review_controller_1.reviewsController.getReviewsForHomePage);
exports.reviewRoutes = router;
