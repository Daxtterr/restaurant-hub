import { Request, Response } from "express";
import userServices from "../services/user.services";
import { IRequest } from "../@types/types";

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

const addToCart = async (req: IRequest, res: Response) => {
  try {
    const response = await userServices.addToCart(req.body, req.user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to add to cart",
      status: "failure",
    });
  }
};

const displayCart = async (req: IRequest, res: Response) => {
  try {
    const response = await userServices.displayCart(req.user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to display cart",
      status: "failure",
    });
  }
};
export default { userSignUp, adminSignUp, login, addToCart,displayCart };
