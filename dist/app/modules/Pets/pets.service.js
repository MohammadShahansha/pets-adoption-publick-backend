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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const pets_constant_1 = require("./pets.constant");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const creatPets = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelper.verifyToken(token, config_1.default.jwt.jwt_secret);
    }
    catch (err) {
        throw new Error("Unauthorized Access");
    }
    const result = yield prisma_1.default.pet.create({
        data: payload,
    });
    return result;
});
const getAllPet = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const { page, limit, skip } = paginationHelpers_1.paginateHelpers.calculatePagination(options);
    const andCondition = [];
    if (params.searchTerm) {
        andCondition.push({
            OR: pets_constant_1.petSearchFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereCondition = { AND: andCondition };
    const result = yield prisma_1.default.pet.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma_1.default.pet.count({
        where: whereCondition,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updatePet = (token, petId, data) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelper.verifyToken(token, config_1.default.jwt.jwt_secret);
    }
    catch (err) {
        throw new Error("Unauthorized Access");
    }
    const result = yield prisma_1.default.pet.update({
        where: {
            id: petId,
        },
        data,
    });
    return result;
});
const deletePet = (token, petId) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelper.verifyToken(token, config_1.default.jwt.jwt_secret);
    }
    catch (err) {
        throw new Error("Unauthorized Access");
    }
    const result = yield prisma_1.default.$transaction((transectionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transectionClient.adoptionRequest.deleteMany({
            where: {
                petId: petId,
            },
        });
        const petDelete = yield transectionClient.pet.delete({
            where: {
                id: petId,
            },
        });
        return petDelete;
    }));
    return result;
});
const getSinglePet = (petId) => __awaiter(void 0, void 0, void 0, function* () {
    // let decodedData;
    // try {
    //   decodedData = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);
    // } catch (err) {
    //   throw new Error("Unauthorized Access");
    // }
    const result = yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id: petId,
        },
    });
    return result;
});
const availablePets = () => __awaiter(void 0, void 0, void 0, function* () {
    const pets = yield prisma_1.default.pet.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    const totalPets = yield prisma_1.default.pet.count();
    return {
        pets,
        totalPets,
    };
});
exports.petService = {
    creatPets,
    getAllPet,
    updatePet,
    deletePet,
    getSinglePet,
    availablePets,
};
