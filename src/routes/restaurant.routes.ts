import express, { Router } from "express";
import restaurantControllers from "../controllers/restaurant.controllers";
// import authMiddleware from "../middlewares/auth";

const router: Router = express.Router();

router.post(
  "/create-restaurant",
  //   authMiddleware.authenticate,
  restaurantControllers.createRestaurant
);
router.post("/create-meal", restaurantControllers.createMeal);
export default router;
