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
exports.adoptionReqController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const adoptionReq_service_1 = require("./adoptionReq.service");
const createAdoptionReq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield adoptionReq_service_1.adoptionReqService.createAdoptionReq(token, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Adoption request submitted successfully",
        data: result,
    });
}));
const getAllAdoptionReq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield adoptionReq_service_1.adoptionReqService.getAllAdoptionReq(token);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Adoption request retrived successfully",
        data: result,
    });
}));
const getUserAdoptionReq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield adoptionReq_service_1.adoptionReqService.getUserAdoptionReq(token);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Adoption request retrived successfully",
        data: result,
    });
}));
const updateAdoptionReq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    const token = req.headers.authorization;
    // console.log("body", req.body, "reqId", requestId, "token", token);
    const result = yield adoptionReq_service_1.adoptionReqService.updateAdoptionReq(token, requestId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Adoption request updated successfully",
        data: result,
    });
}));
const deleteAdoptionReq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    const token = req.headers.authorization;
    yield adoptionReq_service_1.adoptionReqService.deleteAdoptionReq(token, requestId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Adoption request deleted successfully",
    });
}));
const getAdoptionRequestStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adoptionReq_service_1.adoptionReqService.getAdoptionRequestStatus();
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Adoption request status retrived successfully",
        data: result,
    });
}));
exports.adoptionReqController = {
    createAdoptionReq,
    getAllAdoptionReq,
    getUserAdoptionReq,
    updateAdoptionReq,
    deleteAdoptionReq,
    getAdoptionRequestStatus,
};
