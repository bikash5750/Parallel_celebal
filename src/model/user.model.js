import mongoose, { Schema } from "mongoose";
import z from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { string } from "zod/v4";

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
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshtoken :{
      type : string
    }
  },
  { timestamps: true }
);

//  Pre-save hook for password hashing
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//  Check hashed password
UserSchema.methods.checkPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

//  Generate JWT token
UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXP,
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



// Export Mongoose model
const User = mongoose.model("User", UserSchema);

export {User}