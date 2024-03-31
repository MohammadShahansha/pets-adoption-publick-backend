import { Request, Response } from "express";
import { userService } from "./user.service";
import sendRespons from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  const { id, name, email, createdAt, updatedAt } = result;
  const resultWithoutPassword = {
    id,
    name,
    email,
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
export const userController = {
  createUser,
};
