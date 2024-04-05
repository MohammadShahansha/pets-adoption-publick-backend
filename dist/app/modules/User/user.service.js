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
const getUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
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
    const { id, name, email, createdAt, updatedAt } = isUserExist;
    const result = {
        id,
        name,
        email,
        createdAt,
        updatedAt,
    };
    return result;
});
const updateUser = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.userService = {
    getUser,
    updateUser,
};
