import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userService } from "./user.service";
import sendRespons from "../../../shared/sendResponse";

const getUser = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await userService.getUser(token as string);
  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await userService.updateUser(token as string, req.body);
  const { id, name, email, createdAt, updatedAt } = result;
  const updatedResult = {
    id,
    name,
    email,
    createdAt,
    updatedAt,
  };
  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "User profile updated successfully",
    data: updatedResult,
  });
});

export const userController = {
  getUser,
  updateUser,
};
