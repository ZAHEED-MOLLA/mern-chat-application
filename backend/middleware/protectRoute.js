import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const protectRoute = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).json({error: "Unauthorized-Token is not provided"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({error: "Unauthorized-Invalid token"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            res.status(404).json({error: "User is not found"});
        }
        req.user = user;
        next();
        
    } catch (error) {
        console.log("Error in protectroute middleware:",error.message);
        res.send(500).json({error: "Internal server error"});
    }
};

export default protectRoute;