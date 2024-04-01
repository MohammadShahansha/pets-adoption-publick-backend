import { Request, Response } from "express";
import sendRespons from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { petService } from "./pets.service";
import pick from "../../../shared/pick";
import { petFilterableFields } from "./pets.constant";

const createpet = catchAsync(async (req: Request, res: Response) => {
  const result = await petService.creatPets(req.body);
  sendRespons(res, {
    statusCode: 201,
    success: true,
    message: "Pet added successfully",
    data: result,
  });
});
const getAllPet = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, petFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await petService.getAllPet(filters, options);
  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "Pets retrieved successfully",
    data: result,
  });
});
export const petController = {
  createpet,
  getAllPet,
};
