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
exports.postService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createPost = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const reviewsData = {
        userId: isUserExist.id,
        title: payload.title,
        description: payload.description,
        image: payload.image,
    };
    const result = yield prisma_1.default.post.create({
        data: reviewsData,
    });
    return result;
});
const getAllPost = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: true,
        },
    });
    return result;
});
const getSinglePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.post.findUniqueOrThrow({
        where: {
            id: id,
        },
        include: {
            user: true,
        },
    });
    return result;
});
exports.postService = {
    createPost,
    getAllPost,
    getSinglePost,
};
