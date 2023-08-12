import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken'

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        var existingUser=await User.findOne({email})
        if(!existingUser)
           return res.status(404).json({message:'User dosent exist'});
        if(password!==existingUser.password){
            return res.status(404).json({message:'Invalid credentials'}); 
        }
        const token=jwt.sign({
            email:existingUser.email,
            id:existingUser._id,
        },'test',{expiresIn :'2h'})

        res.status(200).json({result:existingUser,token})
            
    }catch(err){
        console.log("LOGIN_ERR",err)
    }
}
export const signup=async(req,res)=>{
    const {fName,lName,email,password,confirmPassword}=req.body;
    console.log(req.body)
    const pic=req.file ? req.file.filename:null;
    console.log(req.file)
    try{
        const existingUser=await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message:'User already exists'});
        if(password!==confirmPassword)
            return res.status(400).json({message:'Invalid credentials'});

            const result= await User.create({
                email,
                password,
                name:`${fName} ${lName}`,
                pic,
            })
            delete result.password;

            const token=jwt.sign({
            email:result.email,
            id:result._id,
        },'test',{expiresIn:"2h"})

            res.status(200).json({result,token})

    }catch(err){
        res.status(500).json(err.message)
    }
}

export const allusers=async (req,res)=>{
    const keyword=req.query.search
    ?{
        $or:[
            {name:{$regex:req.query.search,$options:'i'}},
            {email:{$regex:req.query.search,$options:'i'}}
        ]
    }:{};

    try{
        const users=await User.find(keyword).find({_id:{$ne:req.user._id}}).select('name email pic');
        res.status(200).json({users});
    }catch(err){
        res.status(500).json({message:"FIND_USERS"})
    }
        
}