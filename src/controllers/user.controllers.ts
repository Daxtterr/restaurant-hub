import { Request, Response } from "express";
import userServices from "../services/user.services";

const userSignUp = async (req: Request, res: Response) => {
  try {
    const response = await userServices.userSignUp(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create user",
      status: "failure",
    });
  }
};

const adminSignUp = async (req: Request, res: Response) => {
  try {
    const response = await userServices.adminSignUp(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create admin",
      status: "failure",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const response = await userServices.login(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to login",
      status: "failure",
    });
  }
};

export default { userSignUp, adminSignUp, login };
