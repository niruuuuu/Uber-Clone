import express from "express"
import { body } from "express-validator"
import { authUser } from "../middlewares/auth.middleware.js"
import { register, login, getUserProfile, logoutUser } from "../controllers/user.controller.js"

const router = express.Router()

router.route("/register").post(
  [
    body('email').isEmail().withMessage("Invalid Email"),
    body('firstname').isLength({ min: 3 }).withMessage("Firstname must be at least 3 chars long"),
    body('lastname').isLength({ min: 3 }).withMessage("Lastname must be at least 3 chars long"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 chars long")
  ],
  register
)

router.route("/login").post(
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Please Enter a valid password")
  ],
  login
)

router.route("/profile").get(authUser, getUserProfile)
router.route("/logout").get(authUser, logoutUser)

export default router