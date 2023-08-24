import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const auth=async(req,res,next)=>{
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try{
            token=req.headers.authorization.split(" ")[1];

            const decoded=jwt.verify(token,process.env.SECRET);
            req.user=await User.findById(decoded.id).select('-password');

            next();
        }catch(err){
            res.status(401).json('Not authorised');
        }
    }
}
export default auth;