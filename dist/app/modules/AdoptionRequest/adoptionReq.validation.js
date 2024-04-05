"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionReqVaildationSchema = void 0;
const zod_1 = require("zod");
const adoptionReqVaildation = zod_1.z.object({
    body: zod_1.z.object({
        petId: zod_1.z.string(),
        petOwnershipExperience: zod_1.z.string(),
    }),
});
exports.adoptionReqVaildationSchema = {
    adoptionReqVaildation,
};
