import { Request, Response } from "express";
import sendRespons from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { petService } from "./pets.service";

const createpet = catchAsync(async (req: Request, res: Response) => {
  const result = await petService.creatPets(req.body);
  sendRespons(res, {
    statusCode: 201,
    success: true,
    message: "Pet added successfully",
    data: result,
  });
});
export const petController = {
  createpet,
};
