import { validationResult } from "express-validator";
import { User } from "../models/user.model.js";
import { BlacklistToken } from "../models/token.model.js";

const register = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      console.log(`Errors in registration: ${errors.array()}`);
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      console.log("Something went wrong while recieving data from req body");
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    if ([firstname, lastname, email, password].some((field) => field === "")) {
      console.log("Something went wrong while recieving data from req body");
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    const findUser = await User.findOne({ email });

    if (findUser) {
      console.log("Email Already exists");
      return res.status(409).json({
        success: false,
        message: "This email already exists",
      });
    }

    const user = await User.create({
      fullname: { firstname, lastname },
      email,
      password,
    });

    if (!user) {
      console.log("Something went wrong in while creating user in database");
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }

    const newUser = await User.findById(user._id).select("-password");

    if (!newUser) {
      console.log("Something went wrong in while creating user in database");
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }

    const token = newUser.generateAuthToken();

    return res.status(201).cookie("token", token).json({
      success: true,
      user: newUser,
      token: token,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(`Registration error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const login = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(`Error In Login with some request: ${errors.array()}`);
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      console.log(`Error In Login with recieving data request body`);
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log(`User not found`);
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      console.log(`Wrong Password`);
      return res.status(401).json({
        success: false,
        message: "Inavlid Email or password",
      });
    }

    const token = user.generateAuthToken();

    const userResponse = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    };
    console.log(userResponse);

    return res.status(200).cookie("token", token).json({
      success: true,
      user: userResponse,
      token: token,
    });
  } catch (error) {
    console.log(`Login Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getUserProfile = async function (req, res, next) {
  return res.status(200).json({
    success: true,
    user: req.user,
    message: "User found successfully",
  });
};

const logoutUser = async function (req, res, next) {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token) {
      console.log(`Couldn't get token in the logout endpoint`);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }

    const blackListToken = await BlacklistToken.create({ token });

    if (!blackListToken) {
      console.log("Token not entered into the blacklist");
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logout successgully"
    })

  } catch (error) {
    console.log(`Error in logout endpoint: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { register, login, getUserProfile, logoutUser };
