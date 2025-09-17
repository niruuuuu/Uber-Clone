import express, { Router } from "express";
import { authCaptain } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";
import { register, login, getCaptainProfile, logoutCaptain } from "../controllers/captain.controller.js";

const router = express.Router();

router
  .route("/register")
  .post([
    body("email").isEmail().withMessage("Invalid email"),
    body("firstname").isLength({ min: 3 }).withMessage("Firstname must be at least 3 characters long"),
    body("lastname").isLength({ min: 3 }).withMessage("Lastname must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("color").isLength({ min: 3 }).withMessage("Color must be at least 3 characters long"),
    body("capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
    body("vehicleType").isIn(["Car", "Bike", "Auto"]).withMessage("Invalid vehicle type"),
  ], register);

router
  .route("/login")
  .post([
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
  ], login)

router.route("/profile").get(authCaptain, getCaptainProfile)
router.route("/logout").get(authCaptain, logoutCaptain)


export default router;
