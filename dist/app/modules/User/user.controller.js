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
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield user_service_1.userService.getMe(token);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User profile retrieved successfully",
        data: result,
    });
}));
const updateMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield user_service_1.userService.updateMe(token, req.body);
    // console.log(result);
    // const { id, name, email, createdAt, updatedAt } = result;
    // const updatedResult = {
    //   id,
    //   name,
    //   email,
    //   createdAt,
    //   updatedAt,
    // };
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User profile updated successfully",
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Users retrive successfully",
        data: result,
    });
}));
const updateUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userService.updateUsers(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User updated successfully",
        data: result,
    });
}));
//for dashboard----------------------------------------
const getUsersDependOnStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getUsersDependOnStatus();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Users retrive depend on status successfully",
        data: result,
    });
}));
exports.userController = {
    getMe,
    updateMe,
    getAllUsers,
    updateUsers,
    getUsersDependOnStatus,
};
