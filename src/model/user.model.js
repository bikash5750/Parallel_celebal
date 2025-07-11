// models/User.js
import mongoose, { Schema } from "mongoose";
import config from "../../utils/config.js";
import z from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Mongoose User Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshtoken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Pre-save hook for password hashing
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to check password
UserSchema.methods.checkPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Method to generate JWT token
UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXP,
    }
  );
};

// Zod password schema
export const zodPasswordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .refine((val) => /[a-z]/.test(val), {
    message: "At least one lowercase letter required",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "At least one uppercase letter required",
  })
  .refine((val) => /[^a-zA-Z0-9]/.test(val), {
    message: "At least one special character required",
  });

const User = mongoose.model("User", UserSchema);
export { User };
