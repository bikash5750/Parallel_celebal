import { User } from "../models/user.model.js";
import { zodPasswordSchema } from "../models/user.model.js";

// Register
const registeruser = async (req, res) => {
  try {
    const { username, email, fullname, password, avatar } = req.body;

    if (!username || !email || !fullname || !password || !avatar) {
      return res.status(400).json({ msg: "Please enter all required details including avatar." });
    }

    // Zod password validation
    const passwordValidation = zodPasswordSchema.safeParse(password);
    if (!passwordValidation.success) {
      return res.status(400).json({
        msg: "Password must contain at least 1 uppercase, 1 lowercase, 1 special character and be minimum 6 characters.",
      });
    }

    // Check if user exists
    const finduser = await User.findOne({ $or: [{ username }, { email }] });
    if (finduser) {
      return res.status(409).json({ msg: "User already exists. Please login." });
    }

    // Create and save new user
    const newuser = new User({ username, email, fullname, password, avatar });
    await newuser.save();

    return res.status(200).json({
      msg: "User created successfully",
      data: { username, email, fullname, avatar },
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error: Unable to create user",
      error: error.message,
    });
  }
};

// Login
const userlogin = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Missing login credentials" });
    }

    const finduser = await User.findOne({ $or: [{ username }, { email }] });
    if (!finduser) {
      return res.status(400).json({ msg: "User not found. Please register." });
    }

    const isPasswordValid = await finduser.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const refreshtoken = finduser.generateJWT();
    finduser.refreshtoken = refreshtoken;
    await finduser.save({ validateBeforeSave: false });

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    return res
      .status(200)
      .cookie("refreshtoken", refreshtoken, options)
      .json({
        msg: "Login successful",
        username: finduser.username,
        email: finduser.email,
        avatar: finduser.avatar,
        refreshtoken,
      });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

// Logout
const logoutuser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $set: { refreshtoken: undefined },
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("refreshtoken", options)
      .json({ msg: "User logged out" });
  } catch (error) {
    return res.status(500).json({
      msg: "Unable to logout. Please try again.",
      error: error.message,
    });
  }
};

export { userlogin, registeruser, logoutuser };
