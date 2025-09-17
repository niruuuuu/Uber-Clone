import { User } from "../models/user.model.js";
import { BlacklistToken } from "../models/token.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authUser = async function (req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token) {
      console.log(`Token not found in the auth middleware`);
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

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
    console.log(`Error while decoding user in the authUser`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { authUser };