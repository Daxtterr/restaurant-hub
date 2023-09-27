import mongoose from "mongoose";
import { ICart } from "../@types/types";

const cartSchema = new mongoose.Schema<ICart>(
  {
    name: {
      type: String,
    },
    price: {
      type: String,
    },
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICart>("cart", cartSchema);
