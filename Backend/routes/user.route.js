import express from "express"
import { body } from "express-validator"
import { register } from "../controllers/user.controller.js"

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

export default router