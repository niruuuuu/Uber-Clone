import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";

const register = async function (req, res, next) {
  try {
    const errors = validationResult(req)
    console.log(errors)

    if (!errors.isEmpty()) {
      console.log(`Errors in registration: ${errors.array()}`)
      return res.status(400).json({ errors: errors.array() })
    }

    const { firstname, lastname, email, password } = req.body

    if (!firstname || !lastname || !email || !password) {
      console.log("Something went wrong while recieving data from req body")
      return res.status(400).json({
        "success": false,
        "message": "Something went wrong"
      })
    }

    if ([firstname, lastname, email, password].some((field) => field === "")) {
      console.log("Something went wrong while recieving data from req body")
      return res.status(400).json({
        "success": false,
        "message": "Something went wrong"
      })
    }

    const findUser = await User.findOne({email})

    if (findUser) {
      console.log("Email Already exists")
      return res.status(409).json({
        "success": false,
        "message": "This email already exists"
      })
    }

    const user = await User.create({
      fullname: { firstname, lastname },
      email,
      password
    })

    if (!user) {
      console.log("Something went wrong in while creating user in database")
      return res.status(500).json({
        "success": false,
        "message": "Something went wrong"
      })
    }

    const token = user.generateAuthToken()

    return res.status(201).json({ user, token })
  } catch (error) {
    console.log(`Registration error: ${error.message}`)
    return res.status(500).json({
      "success": false,
      "message": "Internal Server Error"
    })
  }
};

export { register }
