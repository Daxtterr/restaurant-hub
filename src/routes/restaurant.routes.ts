import express, { Router } from "express";
import restaurantControllers from "../controllers/restaurant.controllers";
import auth from "../middlewares/auth";

const router: Router = express.Router();

router.post(
  "/create-restaurant",
  auth.authenticateAdmin,
  restaurantControllers.createRestaurant
);
router.post(
  "/create-meal",
  auth.authenticateAdmin,
  restaurantControllers.createMeal
);
export default router;
