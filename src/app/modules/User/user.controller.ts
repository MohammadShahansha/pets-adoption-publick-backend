import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userService } from "./user.service";
import sendRespons from "../../../shared/sendResponse";

const getMe = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await userService.getMe(token as string);
  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});
const updateMe = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await userService.updateMe(token as string, req.body);
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

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "Users retrive successfully",
    data: result,
  });
});

const updateUsers = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.updateUsers(id, req.body);

  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});
const deleteUsers = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await userService.deleteUser(id);

  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "User deleted successfully",
  });
});
export const userController = {
  getMe,
  updateMe,
  getAllUsers,
  updateUsers,
  deleteUsers,
};
