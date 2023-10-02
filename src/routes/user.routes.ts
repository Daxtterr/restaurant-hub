import express, { Router } from "express";
import userControllers from "../controllers/user.controllers";
import auth from "../middlewares/auth";
const router: Router = express.Router();

router.post("/usersignup", userControllers.userSignUp);
router.post("/adminsignup", userControllers.adminSignUp);
router.post("/login", userControllers.login);
router.post("/addtocart", auth.authenticateUser, userControllers.addToCart);
router.post("/cart", auth.authenticateUser, userControllers.displayCart);

export default router;
