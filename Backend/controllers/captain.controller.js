import { Captain } from "../models/captain.model.js";
import { BlacklistToken } from "../models/token.model.js";
import { validationResult } from "express-validator";

const register = async function (req, res, next) {
  console.log("ddd")
  try {
    console.log("innnn")
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(`Error in captain request validation: ${errors.array()}`);
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        message: "Something went wrong"
      })
    }

    const { firstname, lastname, email, password, color, plate, capacity, vehicleType } = req.body

    if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
      console.log(`Error in receiving data from request body`);
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    const existCaptain = await Captain.findOne({ email })

    if (existCaptain) {
      console.log(`This email already exists`);
      return res.status(409).json({
        success: false,
        message: "This email already exists"
      })
    }

    const captain = await Captain.create({
      fullname: { firstname, lastname },
      email,
      password,
      vehicle: { color, plate, capacity, vehicleType }
    })

    if (!captain) {
      console.log(`Some error occured while creating new captain in the database`)
      return res.status(500).json({
        success: false,
        message: "Somethin went wrong"
      })
    }

    const token = captain.generateAuthToken()

    return res.status(201).cookie("token", token).json({
      success: true,
      message: "Captain created succesfully",
      captain: captain,
      token: token
    })

  } catch (error) {
    console.log(`Error in captain register api: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const login = async function (req, res, next) {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      console.log(`Error in captain login request validation: ${errors.array()}`);
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        message: "Something went wrong"
      })
    }

    const { email, password } = req.body

    if (!email || !password) {
      console.log(`Error in receving data from captain login req body`)
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    const captain = await Captain.findOne({ email }).select("+password")

    if (!captain) {
      console.log("This email doesn't exist")
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      })
    }

    const isPasswordCorrect = await captain.comparePassword(password)

    if (!isPasswordCorrect) {
      console.log("Invalid Password")
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      })
    }

    const token = captain.generateAuthToken()
    const captainResponse = {
      _id: captain._id,
      fullname: captain.fullname,
      email: captain.email,
      vehicle: captain.vehicle,
      status: captain.status,
    }

    return res
      .status(200)
      .cookie("token", token)
      .json({
        success: true,
        message: "Captain logged in successfully",
        captain: captainResponse,
        token: token
      })

  } catch (error) {
    console.log(`Error in captain login api: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

const getCaptainProfile = async function (req, res, next) {
  try {
    return res.status(200).json({
      success: true,
      message: "Captain profile loaded successfully",
      captain: req.captain
    })
  } catch (error) {
    console.log(`Error in captain profile endpoint: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const logoutCaptain = async function (req, res, next) {
  try {
    res.clearCookie("token")

    const token = req.cookies.token || req.headers?.authorization.split(" ")[1]
    if (!token) {
      console.log(`Token not found in logout captain endpoint`)
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    const blacklistToken = await BlacklistToken.create({ token })

    if (!blacklistToken) {
      console.log("Token not entered into the blacklist");
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    })

  } catch (error) {
    console.log(`Errors in captain logout endpoint: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export { register, login, getCaptainProfile, logoutCaptain };
