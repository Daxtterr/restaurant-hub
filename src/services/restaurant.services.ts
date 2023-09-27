import { IMeal, IRestaurant, IUser } from "../@types/types";
import response from "../utils/response";
import Restaurant from "../models/restaurant.model";
import Meal from "../models/meal.model";

const createRestaurant = async (payload: IRestaurant) => {
  const { name, phoneNumber, emailAddress } = payload;

  const foundName = await Restaurant.findOne({ name: name });
  if (foundName) {
    return response.buildFailure("Restaurant name already exists", 400);
  }

  const foundNumber = await Restaurant.findOne({ phoneNumber: phoneNumber });
  if (foundNumber) {
    return response.buildFailure("Phone Number already exists", 400);
  }

  const foundEmail = await Restaurant.findOne({ emailAddress: emailAddress });
  if (foundEmail) {
    return response.buildFailure("Email already exists", 400);
  }
  const newRestaurant = await Restaurant.create(payload);
  return response.buildSuccess(
    "Restaurant succesfully created",
    200,
    newRestaurant
  );
};

const createMeal = async (payload: IMeal) => {
  const foundMeal = await Meal.findOne({ name: payload.name });
  if (foundMeal) {
    return response.buildFailure("Meal already exists", 400);
  }
  const newMeal = await Meal.create(payload);
  return response.buildSuccess("New meal created", 200, newMeal);
};

export default { createRestaurant,createMeal };
