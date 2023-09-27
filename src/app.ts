import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./configs/database";
import userRouter from "./routes/user.routes";
import restaurantRouter from "./routes/restaurant.routes";
dotenv.config();

const PORT: Number = Number(process.env.PORT) || 5554;
const app: Express = express();
connectDB(<string>process.env.MONGO_URI);

app.use(express.json());
app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);

app.listen(PORT, () => {
  console.log(`I am running on ${PORT}`);
});
