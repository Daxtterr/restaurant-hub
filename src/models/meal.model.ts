import mongoose from "mongoose";
import { IMeal } from "../@types/types";

const mealSchema = new mongoose.Schema<IMeal>(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMeal>("meal", mealSchema);
