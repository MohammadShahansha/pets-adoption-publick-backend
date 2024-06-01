import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { Review, ReviewStatus } from "@prisma/client";

type TPayload = {
  rating: string;
  reviewDescription: string;
};

const createReview = async (user: JwtPayload | null, payload: TPayload) => {
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });
  const reviewsData = {
    userId: isUserExist.id,
    rating: payload.rating,
    reviewDescription: payload.reviewDescription,
  };
  const result = await prisma.review.create({
    data: reviewsData,
  });
  return result;
};

const getAllReviews = async () => {
  const result = await prisma.review.findMany({
    where: {
      status: ReviewStatus.PENDING,
    },
    include: {
      user: true,
    },
  });
  return result;
};

const updateReview = async (
  reviewId: string,
  payload: Partial<Review>
): Promise<Review> => {
  const result = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: payload,
  });
  return result;
};

const getReviewsForHomePage = async () => {
  const result = await prisma.review.findMany({
    where: {
      status: ReviewStatus.APPROVED,
    },
    include: {
      user: true,
    },
  });
  return result;
};

export const reviewsService = {
  createReview,
  getAllReviews,
  updateReview,
  getReviewsForHomePage,
};
