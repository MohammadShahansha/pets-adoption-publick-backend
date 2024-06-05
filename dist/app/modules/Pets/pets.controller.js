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
exports.petController = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pets_service_1 = require("./pets.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const pets_constant_1 = require("./pets.constant");
const createpet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const result = yield pets_service_1.petService.creatPets(token, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Pet added successfully",
        data: result,
    });
}));
const getAllPet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, pets_constant_1.petFilterableFields);
    const options = (0, pick_1.default)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = yield pets_service_1.petService.getAllPet(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Pets retrieved successfully",
        data: result,
    });
}));
const updatePet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId } = req.params;
    const token = req.headers.authorization;
    const result = yield pets_service_1.petService.updatePet(token, petId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Pet profile updated successfully",
        data: result,
    });
}));
const deletePet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId } = req.params;
    const token = req.headers.authorization;
    const result = yield pets_service_1.petService.deletePet(token, petId);
    // console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Pet delete successfully",
    });
}));
const getSinglePet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId } = req.params;
    const token = req.headers.authorization;
    const result = yield pets_service_1.petService.getSinglePet(token, petId);
    // console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Pet retrive successfully",
        data: result,
    });
}));
const availablePets = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pets_service_1.petService.availablePets();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Available pets retrive successfully",
        data: result,
    });
}));
exports.petController = {
    createpet,
    getAllPet,
    updatePet,
    deletePet,
    getSinglePet,
    availablePets,
};
