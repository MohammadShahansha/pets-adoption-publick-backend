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
exports.userService = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const client_1 = require("@prisma/client");
const getMe = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelper.verifyToken(token, config_1.default.jwt.jwt_secret);
    }
    catch (err) {
        throw new Error("You are not authorized");
    }
    const isUserExist = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
        },
    });
    const { id, name, email, photo, role, createdAt, updatedAt } = isUserExist;
    const result = {
        id,
        name,
        email,
        photo,
        role,
        createdAt,
        updatedAt,
    };
    return result;
});
const updateMe = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelper.verifyToken(token, config_1.default.jwt.jwt_secret);
    }
    catch (err) {
        throw new Error("You are not authorized");
    }
    const isUserExist = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
        },
    });
    const result = yield prisma_1.default.user.update({
        where: {
            id: isUserExist.id,
        },
        data,
    });
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        orderBy: { createdAt: "desc" },
    });
    return result;
});
const updateUsers = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id: id,
        },
        data,
    });
    return result;
});
// const deleteUser = async (id: string) => {
//   const result = await prisma.user.delete({
//     where: {
//       id: id,
//     },
//   });
//   return result;
// };
//for dashboard-----------------------------
const getUsersDependOnStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalUser = yield prisma_1.default.user.count();
    const activeUsers = yield prisma_1.default.user.count({
        where: {
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const blockedUsers = yield prisma_1.default.user.count({
        where: {
            status: client_1.UserStatus.BLOCKED,
        },
    });
    const deletedUsers = yield prisma_1.default.user.count({
        where: {
            status: client_1.UserStatus.DELETED,
        },
    });
    return {
        totalUser,
        activeUsers,
        blockedUsers,
        deletedUsers,
    };
});
exports.userService = {
    getMe,
    updateMe,
    getAllUsers,
    updateUsers,
    getUsersDependOnStatus,
};
