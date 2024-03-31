import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

type TResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response: TResponse = {
    success: false,
  };
  if (err.name === "PrismaClientKnownRequestError" && err.code === "P2002") {
    response.message = "Email Already Exist";
    response.error = err;
  } else {
    response.message = err.message || "Something went wrong";
    response.error = err;
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
};
export default globalErrorHandler;
