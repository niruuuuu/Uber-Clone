import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const captainSchema = new Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "Firstname should be atleast 3 character long"],
    },
    lastname: {
      type: String,
      required: true,
      minLength: [3, "Lastname should be atleast 3 character long"],
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [ /\S+@\S+\.\S+/, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketID: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [3, "Color must be at least 3 character long"]
    },
    plate: {
      type: String,
      required: true,
      minLength: [3, "Plate must be at least 3 character long"]
    },
    capacity: {
      type: Number,
      required: true,
      minLength: [1, "Minimum capacity is 1"]
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["Car", "Bike", "Auto"]
    }
  },
  location: {
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    },
  }
})

captainSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  )
  return token
}

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}


export const Captain = mongoose.model("Captain", captainSchema)