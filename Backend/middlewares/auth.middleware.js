import { User } from "../models/user.model.js";
import { Captain } from "../models/captain.model.js";
import { BlacklistToken } from "../models/token.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authUser = async function (req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    console.log(req.cookies)

    if (!token) {
      console.log(`Token not found in the auth middleware`);
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // console.log(token)

    const isBlackListedToken = await BlacklistToken.findOne({ token })

    if (isBlackListedToken) {
      console.log(`User is using blacklisted token`)
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      console.log(`Error while decoding user in the authUser`);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

    const user = await User.findById(decodedToken._id).select("-password")

    if (!user) {
      console.log(`User not found from decoded jwt data`)
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    req.user = user
    return next()
  } catch (error) {
    console.log(`Error while decoding user in the authUser: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const authCaptain = async function (req, res, next) {
  try {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    console.log(token)

    if (!token) {
      console.log(`Token not found in authCaptain`)
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }
    console.log(token)

    const isBlackListedToken = await BlacklistToken.findOne({ token })
    console.log("kkkk")

    if (isBlackListedToken) {
      console.log(`User is using blacklisted token`)
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!decodedToken) {
      console.log(`Error while decoding user in the authCaptain`);
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      })
    }

    const captain = await Captain.findById(decodedToken._id)

    if (!captain) {
      console.log("Captain not found while decoding authCaptain")
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    req.captain = captain
    return next()

  } catch (error) {
    console.log(`Error while decoding user in the authCaptain: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: "internal Server Error"
    })
  }
}

export { authUser, authCaptain };