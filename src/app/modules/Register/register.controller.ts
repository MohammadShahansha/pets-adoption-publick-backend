import { Request, Response } from "express";
import { registrationService } from "./register.service";
import sendRespons from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await registrationService.createUser(req.body);
  console.log(result);
  const { id, name, email, role, photo, createdAt, updatedAt } = result;
  const resultWithoutPassword = {
    id,
    name,
    email,
    role,
    photo,
    createdAt,
    updatedAt,
  };
  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "User registered successfully",
    data: resultWithoutPassword,
  });
});

export const registrationController = {
  createUser,
};
