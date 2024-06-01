import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendRespons from "../../../shared/sendResponse";
import { postService } from "./post.service";
const createPost = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await postService.createPost(user, req.body);
    sendRespons(res, {
      statusCode: 201,
      success: true,
      message: "Post Created successfully",
      data: result,
    });
  }
);
const getAllPost = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.getAllPost();
  sendRespons(res, {
    statusCode: 201,
    success: true,
    message: "All Post Retrive Successfully",
    data: result,
  });
});

export const postController = {
  createPost,
  getAllPost,
};
