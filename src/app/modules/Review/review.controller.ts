import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendRespons from "../../../shared/sendResponse";
import { reviewsService } from "./review.service";

const createReview = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await reviewsService.createReview(user, req.body);
    sendRespons(res, {
      statusCode: 201,
      success: true,
      message: "Review Created successfully",
      data: result,
    });
  }
);
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewsService.getAllReviews();
  sendRespons(res, {
    statusCode: 201,
    success: true,
    message: "All Reviews Retrive Successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const result = await reviewsService.updateReview(reviewId, req.body);
  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "Review updated successfully",
    data: result,
  });
});

const getReviewsForHomePage = catchAsync(
  async (req: Request, res: Response) => {
    const result = await reviewsService.getReviewsForHomePage();
    sendRespons(res, {
      statusCode: 201,
      success: true,
      message: "All Home Page Reviews Retrive Successfully",
      data: result,
    });
  }
);
export const reviewsController = {
  createReview,
  getAllReviews,
  updateReview,
  getReviewsForHomePage,
};
