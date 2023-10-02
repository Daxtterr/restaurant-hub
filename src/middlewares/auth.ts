import { Request, Response, NextFunction } from "express";
import response from "../utils/response";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { IRequest } from "../@types/types";

const authenticateAdmin = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization!;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      response.buildFailure("Authorization must start with bearer", 400);
    }
    const token = authorization.substring(7);

    const decodedUser: any = await jwt.decode(token);

    const foundUser = await User.findOne({ _id: decodedUser._id });
    if (!foundUser) {
      return response.buildFailure("User not found", 400);
    }

    if (foundUser.role !== "admin") {
      response.buildFailure("Only admins allowed", 400);
    }
    req.user = foundUser;
    next();
  } catch (error: any) {
    return res
      .status(error?.statusCode || 500)
      .send(error?.message || "Unable to authenticate");
  }
};

const authenticateUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization!;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      response.buildFailure("Authorization must start with bearer", 400);
    }
    const token = authorization.substring(7);

    const decodedUser: any = await jwt.decode(token);

    const foundUser = await User.findOne({ _id: decodedUser._id });
    if (!foundUser) {
      return response.buildFailure("User not found", 400);
    }

    if (foundUser.role !== "admin" || "user") {
      response.buildFailure("Only admins allowed", 400);
    }
    req.user = foundUser;
    next();
  } catch (error: any) {
    return res
      .status(error?.statusCode || 500)
      .send(error?.message || "Unable to authenticate");
  }
};

export default { authenticateAdmin ,authenticateUser};
