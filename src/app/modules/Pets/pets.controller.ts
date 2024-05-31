import { Request, Response } from "express";
import sendRespons from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { petService } from "./pets.service";
import pick from "../../../shared/pick";
import { petFilterableFields } from "./pets.constant";

const createpet = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await petService.creatPets(token as string, req.body);
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
const updatePet = catchAsync(async (req: Request, res: Response) => {
  const { petId } = req.params;
  const token = req.headers.authorization;
  const result = await petService.updatePet(token as string, petId, req.body);
  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "Pet profile updated successfully",
    data: result,
  });
});
const deletePet = catchAsync(async (req: Request, res: Response) => {
  const { petId } = req.params;
  const token = req.headers.authorization;
  const result = await petService.deletePet(token as string, petId);
  // console.log(result);
  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "Pet delete successfully",
  });
});
const getSinglePet = catchAsync(async (req: Request, res: Response) => {
  const { petId } = req.params;
  const token = req.headers.authorization;
  const result = await petService.getSinglePet(token as string, petId);
  // console.log(result);
  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "Pet retrive successfully",
    data: result,
  });
});

const availablePets = catchAsync(async (req: Request, res: Response) => {
  const result = await petService.availablePets();
  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "Available pets retrive successfully",
    data: result,
  });
});
export const petController = {
  createpet,
  getAllPet,
  updatePet,
  deletePet,
  getSinglePet,
  availablePets,
};
