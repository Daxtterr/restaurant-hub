import express, { Router } from "express";
import userControllers from "../controllers/user.controllers";

const router: Router = express.Router();

router.post("/usersignup", userControllers.userSignUp);
router.post("/adminsignup", userControllers.adminSignUp);
router.post("/login", userControllers.login);

export default router;
