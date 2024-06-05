"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const client_1 = require("@prisma/client");
const createReview = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const reviewsData = {
        userId: isUserExist.id,
        rating: payload.rating,
        reviewDescription: payload.reviewDescription,
    };
    const result = yield prisma_1.default.review.create({
        data: reviewsData,
    });
    return result;
});
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        where: {
            status: client_1.ReviewStatus.PENDING,
        },
        include: {
            user: true,
        },
    });
    return result;
});
const updateReview = (reviewId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.update({
        where: {
            id: reviewId,
        },
        data: payload,
    });
    return result;
});
const getReviewsForHomePage = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        where: {
            status: client_1.ReviewStatus.APPROVED,
        },
        include: {
            user: true,
        },
    });
    return result;
});
exports.reviewsService = {
    createReview,
    getAllReviews,
    updateReview,
    getReviewsForHomePage,
};
