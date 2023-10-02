import bcrypt from "bcrypt";
import { ICart, IRequest, IUser } from "../@types/types";
import User from "../models/user.model";
import Cart from "../models/cart.model";
import response from "../utils/response";
import jwt from "jsonwebtoken";
import Meal from "../models/meal.model";

const userSignUp = async (payload: IUser) => {
  const { phoneNumber, emailAddress } = payload;

  const foundEmail = await User.findOne({ emailAddress: emailAddress });
  if (foundEmail) {
    return response.buildFailure("Email already exists", 400);
  }
  const foundNumber = await User.findOne({ phoneNumber: phoneNumber });
  if (foundNumber) {
    return response.buildFailure("Number already exists", 400);
  }

  const generatedSalt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  const hashedPassword = await bcrypt.hash(
    <string>payload.password,
    generatedSalt
  );
  payload.password = hashedPassword;
  const newUser = await User.create(payload);
  return response.buildSuccess("User created succesfully", 200, newUser);
};

const adminSignUp = async (payload: IUser) => {
  const { phoneNumber, emailAddress } = payload;

  const foundEmail = await User.findOne({ emailAddress: emailAddress });
  if (foundEmail) {
    return response.buildFailure("Email already exists", 400);
  }
  const foundNumber = await User.findOne({ phoneNumber: phoneNumber });
  if (foundNumber) {
    return response.buildFailure("Number already exists", 400);
  }

  const generatedSalt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  const hashedPassword = await bcrypt.hash(
    <string>payload.password,
    generatedSalt
  );
  payload.password = hashedPassword;
  payload.role = "admin";
  const newUser = await User.create(payload);
  return response.buildSuccess("User created succesfully", 200, newUser);
};

const login = async (payload: IUser) => {
  const { emailAddress, password } = payload;
  const foundUser = await User.findOne({ emailAddress: emailAddress }).lean();
  if (!foundUser) {
    return response.buildFailure("User not found", 400);
  }
  const passwordMatch = await bcrypt.compare(
    <string>password,
    <string>foundUser.password
  );

  if (!passwordMatch) {
    return response.buildFailure("Incorrect Password", 400);
  }
  const token = jwt.sign(
    {
      _id: foundUser._id,
    },
    <string>process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  foundUser.accessToken = token;
  return response.buildSuccess("Login successful", 200, foundUser);
};

const addToCart = async (payload: ICart, user: any) => {
  const { name, price } = payload;
  const findMeal = await Meal.findOne({ name: name });
  if (!findMeal) {
    return response.buildFailure("Meal doesnt exist", 200);
  }

  const mealExists = await Cart.findOne({
    name: name,
    owner: user._id,
  });
  if (mealExists) {
    await Cart.findByIdAndUpdate(
      { _id: mealExists._id },
      { $inc: { quantity: 1 } }
    );
    return response.buildSuccess("Meal quantity increased", 200, mealExists);
  }

  const addedToCart = await Cart.create(payload);
  return response.buildSuccess("Meal added to cart", 201, addedToCart);
};

const displayCart = async (user: any) => {
  const foundCart = await Cart.find({ owner: user._id });
  if (foundCart.length < 1) {
    return response.buildFailure("Cart is currently empty", 400);
  }
  return response.buildSuccess("Cart items displayed", 200, foundCart);
};

export default { userSignUp, adminSignUp, login, addToCart, displayCart };
