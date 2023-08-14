import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";
import { Message } from "../models/messageModel.js";

export const sendMessage=async(req,res)=>{
    const {content,chatId}=req.body;
    console.log(req.body);

    if(!content || !chatId){
        console.log("Invalid data passed into request");
        return res.status(400).json({message:"Invalid Chat"})
    }
    var newMessage={
        sender:req.user._id,
        content:content,
        chat:chatId,
    }
    try{
        var message=await Message.create(newMessage);

        message=await message.populate('sender','name pic');
        message=await message.populate('chat');
        message=await User.populate(message,{
            path:'chat.users',
            select:"name pic email",
        })
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message,
        })

        res.status(200).json(message);
    }catch(err){
         console.log(err);
       return res.status(400).json(err); 
    }
}

export const alllMessage=async(req,res)=>{
    try{
        const messages=await Message.find({chat:req.params.chatId})
        .populate('sender','name pic email')
        .populate('chat');
        res.status(200).json(messages);
    }catch(err){
        res.status(200).json(err);
    }
}