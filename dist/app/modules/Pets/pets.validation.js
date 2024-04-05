"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petsValidationSchema = void 0;
const zod_1 = require("zod");
const petsValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        species: zod_1.z.string(),
        breed: zod_1.z.string(),
        age: zod_1.z.number(),
        size: zod_1.z.string(),
        location: zod_1.z.string(),
        description: zod_1.z.string(),
        temperament: zod_1.z.string(),
        medicalHistory: zod_1.z.string(),
        adoptionRequirements: zod_1.z.string(),
    }),
});
exports.petsValidationSchema = {
    petsValidation,
};
