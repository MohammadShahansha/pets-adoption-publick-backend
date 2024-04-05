"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (err, req, res, next) => {
    const response = {
        success: false,
    };
    if (err.name === "PrismaClientKnownRequestError" && err.code === "P2002") {
        response.message = "Email Already Exist";
        response.error = err;
    }
    else {
        response.message = err.message || "Something went wrong";
        response.error = err;
    }
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(response);
};
exports.default = globalErrorHandler;
