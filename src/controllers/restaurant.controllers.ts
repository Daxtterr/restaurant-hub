import restaurantServices from "../services/restaurant.services";
import { Request, Response } from "express";

const createRestaurant = async (req: Request, res: Response) => {
  try {
    const response = await restaurantServices.createRestaurant(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create restaurant",
      status: "failure",
    });
  }
};

const createMeal = async (req: Request, res: Response) => {
  try {
    const response = await restaurantServices.createMeal(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create meal",
      status: "failure",
    });
  }
};

export default { createRestaurant, createMeal };
