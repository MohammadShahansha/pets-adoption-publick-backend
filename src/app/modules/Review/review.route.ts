import express from "express";
import auth from "../../../middleware/auth";
import { UserRole } from "@prisma/client";
import { reviewsController } from "./review.controller";
const router = express.Router();

router.post(
  "/create-review",
  auth(UserRole.USER),
  reviewsController.createReview
);
router.get(
  "/get-reviews",
  auth(UserRole.ADMIN),
  reviewsController.getAllReviews
);
router.put(
  "/update-review/:reviewId",
  auth(UserRole.ADMIN),
  reviewsController.updateReview
);

router.get(
  "/home-reviews",
  auth(UserRole.ADMIN),
  reviewsController.getReviewsForHomePage
);

export const reviewRoutes = router;
