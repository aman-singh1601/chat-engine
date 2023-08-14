import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";


export const accesschat= async (req,res)=>{
    const {userId}=req.body;

    if(!userId){
        return res.status(400).json("userId param not sent with request");
    }

    var isChat=await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}},
        ]
    }).populate('users',"-password")
    .populate('latestMessage')

    isChat=await User.populate(isChat,{
          path:'latestMessage.sender',
          select: 'name pic email',
    });
    if(isChat.length>0){
        res.status(200).json({isChat})
    }else{
        var chatData={
            chatName:'sender',
            isGroupChat:false,
            users:[req.user._id,userId]
        }
        try{
            const createdChat=await Chat.create(chatData);
            const fullChat=await Chat.findOne({_id:createdChat._id})
            .populate('users','-password');
            res.status(200).json(fullChat)
        }catch(err){
            res.status(400).json(err.message);

        }
    }
}

export const fetchChats=async(req,res)=>{
    try{
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate('users','-password')
        .populate('groupAdmin','-password')
        .populate('latestMessage')
        .sort({updatedAt:-1})
        .then(async (results)=>{
            results=await User.populate(results,{
                path:'latestMessage.sender',
                select:'name pic email',
            });

            res.status(200).json(results);
        })

    }catch(err){
        res.status(401).json(err.message)
    }
};

export const createGroupChat=async(req,res)=>{
        if(!req.body.name || !req.body.newusers){
        return res.status(400).send({message:"Please Fill all the fields"});
    }
    let users = JSON.parse(req.body.newusers);

    if(users.length < 2){
        return res.status(400).send({message:'More than two uers are required to form a group chat'});
    }
    // console.log(req.user)
    users.push(req.user);
try{
    const groupChat=await Chat.create({
        chatName:req.body.name,
        users:users,
        isGroupChat:true,
        groupAdmin:req.user,
    })
    const newGroupChat=await Chat.findOne({_id:groupChat._id})
    .populate("users","-password")
    .populate("groupAdmin","-password");

    res.status(200).json({newGroupChat});

 }catch(err){
    res.status(400).json({message:err.message});
 }}

 export const renameGroup=async(req,res)=>{
    try{
    const {chatId,chatName}=req.body;

    const updatedChat=await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName:chatName,
        },
        {
            new:true,
        }
    ).populate("users","-password")
    .populate("groupAdmin", "-password");
    if(!updatedChat){
        return res.status(400).json({message:"Chat not Found"})
    }else{
        res.status(200).json(updatedChat);
    }
    }catch(err){
        res.status(500).json(err);
    }

 }
 
 export const removeFromGroup =async (req,res)=>{
    const {chatId,userId}=req.body;
    
    const removed=await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull:{users:userId},
        },{
            new:true,
        }
    ).populate("users","-passoword")
    .populate("groupAdmin","-password");
    if(!removed){
        res.status(404).json({message:"Chat Not Found"});
    }else{
        res.status(200).json(removed);
    }
 }