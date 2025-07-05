import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const verifyjwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.refreshtoken || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Refresh token missing or invalid." });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded || !decoded._id) {
      return res.status(403).json({ msg: "Token verification failed." });
    }

    const finduser = await User.findById(decoded._id).select("-password -refreshtoken");

    if (!finduser) {
      return res.status(404).json({ msg: "User not found." });
    }

    req.user = finduser;
    next(); 

  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized access." });
  }
};

export { verifyjwt };
