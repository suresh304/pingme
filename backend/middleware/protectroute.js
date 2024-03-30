import  Jwt  from "jsonwebtoken";
import User from "../models/user.model.js";
const protectroute  = async (req,res,next) =>{
    console.log("hello pretected route")
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).send({"message":"unauthorized no token provided"})
        }
        const decoded = Jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).send({"message":"unauthorized invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).send({"message":"user not found"})

        }
           req.user = user
        next()
    } catch (error) {
console.log("error in protectroute middleroute",error)

        res.status(500).send({"message":"internal server error"})
        
    }
}

export default protectroute