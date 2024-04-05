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
exports.adoptionReqService = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createAdoptionReq = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelper.verifyToken(token, config_1.default.jwt.jwt_secret);
    }
    catch (err) {
        throw new Error("Unauthorized Access");
    }
    const isUserExist = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
        },
    });
    const adoptionReqData = {
        userId: isUserExist.id,
        petId: payload.petId,
        petOwnershipExperience: payload.petOwnershipExperience,
    };
    const result = yield prisma_1.default.adoptionRequest.create({
        data: adoptionReqData,
    });
    return result;
});
const getAllAdoptionReq = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelper.verifyToken(token, config_1.default.jwt.jwt_secret);
    }
    catch (err) {
        throw new Error("Unauthorized Access");
    }
    const result = yield prisma_1.default.adoptionRequest.findMany();
    return result;
});
const updateAdoptionReq = (token, requestId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelper.verifyToken(token, config_1.default.jwt.jwt_secret);
    }
    catch (err) {
        throw new Error("Unauthorized Access");
    }
    const result = yield prisma_1.default.adoptionRequest.update({
        where: {
            id: requestId,
        },
        data: payload,
    });
    return result;
});
exports.adoptionReqService = {
    createAdoptionReq,
    getAllAdoptionReq,
    updateAdoptionReq,
};
