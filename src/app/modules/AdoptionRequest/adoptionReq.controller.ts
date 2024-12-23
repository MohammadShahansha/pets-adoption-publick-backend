import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendRespons from "../../../shared/sendResponse";
import { adoptionReqService } from "./adoptionReq.service";

const createAdoptionReq = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await adoptionReqService.createAdoptionReq(
    token as string,
    req.body
  );
  sendRespons(res, {
    statusCode: 201,
    success: true,
    message: "Adoption request submitted successfully",
    data: result,
  });
});
const getAllAdoptionReq = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await adoptionReqService.getAllAdoptionReq(token as string);
  sendRespons(res, {
    statusCode: 201,
    success: true,
    message: "Adoption request retrived successfully",
    data: result,
  });
});
const getUserAdoptionReq = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await adoptionReqService.getUserAdoptionReq(token as string);
  sendRespons(res, {
    statusCode: 201,
    success: true,
    message: "Adoption request retrived successfully",
    data: result,
  });
});

const updateAdoptionReq = catchAsync(async (req: Request, res: Response) => {
  const { requestId } = req.params;
  const token = req.headers.authorization;
  // console.log("body", req.body, "reqId", requestId, "token", token);
  const result = await adoptionReqService.updateAdoptionReq(
    token as string,
    requestId,
    req.body
  );
  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "Adoption request updated successfully",
    data: result,
  });
});

const deleteAdoptionReq = catchAsync(async (req: Request, res: Response) => {
  const { requestId } = req.params;
  const token = req.headers.authorization;
  await adoptionReqService.deleteAdoptionReq(token as string, requestId);
  sendRespons(res, {
    statusCode: 200,
    success: true,
    message: "Adoption request deleted successfully",
  });
});

const getAdoptionRequestStatus = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adoptionReqService.getAdoptionRequestStatus();
    sendRespons(res, {
      statusCode: 201,
      success: true,
      message: "Adoption request status retrived successfully",
      data: result,
    });
  }
);
export const adoptionReqController = {
  createAdoptionReq,
  getAllAdoptionReq,
  getUserAdoptionReq,
  updateAdoptionReq,
  deleteAdoptionReq,
  getAdoptionRequestStatus,
};
