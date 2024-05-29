import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import { jwtHelper } from "../helpers/jwtHelpers";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("You are not authorize");
      }
      const verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );
      req.user = verifiedUser; //to change password

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new Error("forbidden");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
export default auth;
