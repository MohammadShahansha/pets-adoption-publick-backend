"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendRespons = (res, jsonData) => {
    res.status(jsonData.statusCode).json({
        success: jsonData.success,
        statusCode: jsonData.statusCode,
        message: jsonData.message,
        meta: jsonData.meta || null || undefined,
        data: jsonData.data || null || undefined,
    });
};
exports.default = sendRespons;
