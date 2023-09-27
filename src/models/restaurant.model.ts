import mongoose from "mongoose";
import { IRestaurant } from "../@types/types";

const restaurantSchema = new mongoose.Schema<IRestaurant>(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    emailAddress: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
