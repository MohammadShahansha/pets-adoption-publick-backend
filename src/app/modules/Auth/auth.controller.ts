import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authService } from "./auth.service";
import sendRespons from "../../../shared/sendResponse";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  sendRespons(res, {
    success: true,
    statusCode: 200,
    message: " User logged in successfully",
    data: result,
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await authService.changePassword(user, req.body);
    console.log(result);
    sendRespons(res, {
      success: true,
      statusCode: 200,
      message: " Password changed successfully",
      data: result,
    });
  }
);

export const authController = {
  loginUser,
  changePassword,
};
