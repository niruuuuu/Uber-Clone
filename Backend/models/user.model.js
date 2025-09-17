import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Firstname should be at least 3 characters"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "Firstname should be at least 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  socketID: {
    type: String
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }

  return next()
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET
  )

  return token
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)