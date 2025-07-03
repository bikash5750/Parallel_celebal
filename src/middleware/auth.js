import jwt  from "jsonwebtoken";
import { User } from "../models/user.model";

const verifyjwt = async (req,res,next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.split(' ')[1];

    if(!token){
      return res.status(400).json({
        msg : "invalid token",
      })
    }

    const decodetoken = jwt.verify(token,process.env.access_token_secret)

    if(!decodetoken){
      return res.status(500).json({
        msg : "invalid decode"
      })
    }

    const finduser = await User.findById(decodetoken._id).select("-password -refreshtoken")

    if(!finduser){
      return res.status(500).json({
        msg : "unable to find user, invalid decode"
      })
    }

    req.User = finduser
    next()
  } catch (error) {

    return res.status(400).json({
      msg : "server error",
    })
    
  }
  
}
export {verifyjwt}