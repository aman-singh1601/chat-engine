import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";


export const accesschat=async(req,res)=>{
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
    if(!req.body.groupName || !req.body.groupUsers){
        return res.status(400).send({message:"Please Fill all the fields"});
    }
    var users=JSON.parse(req.body.groupUsers);
    if(users.length<2){
        return res.status(400)
        .send('More than two uers are required to form a group chat');
    }

    

}