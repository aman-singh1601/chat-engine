import express from 'express'
import path from 'path'
import  bodyParser  from 'body-parser'
import 'dotenv/config'
import  mongoose from 'mongoose'
import cors from 'cors'
import {Server} from 'socket.io'


//importing the router
import userRouter from './routes/users.js'
import chatsRouter from './routes/chats.js'
import messagesRouter from './routes/messages.js'

const app=express();

app.use(bodyParser.json({limit:'300mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'300mb',extended:true}))
app.use(cors());

app.use('/uploads',express.static('uploads'))
app.use('/user', userRouter)
app.use('/chats', chatsRouter)
app.use('/messages',messagesRouter)

// --------------deployment---------------
const __dirname1=path.resolve();
if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname1,'/frontend/build')))
}else{
    app.get('/',(req,res)=>{
        res.send("API is running successfully")
    })
}
// --------------deployment---------------


const PORT =process.env.PORT;
const CONNECTION_URL=process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL)
.then(()=>{
    const server=app.listen(PORT,()=>console.log(`SERVER is running on port : ${PORT}`));
    
    const io=new Server(server,{
        pingTimeout: 60000,
        cors:{
            origin:'http://localhost:5173'
        }
    })
    io.on("connection",(socket)=>{
        console.log("connected to soket.io")
        socket.on("setup",(userData)=>{
            console.log(userData._id)
            socket.join(userData._id);
            socket.emit("connected");
        }) 
        socket.on('join chat',(room)=>{
            socket.join(room);
            console.log("user joined room ", room)
        })

        socket.on('typing',(room)=>socket.in(room).emit('typing'))
        socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'))

        socket.on('new message',(newMessageRecieved)=>{
            var chat=newMessageRecieved.chat;
            if(!chat.users) return console.log("chat.users not defined");

            chat.users.forEach(user=>{
                if(user._id===newMessageRecieved.sender._id) return ;

                socket.in(user._id).emit('message recieved',newMessageRecieved);
            })

        })
        socket.off('setup',()=>{
            console.log("user disconnected");
            console.log(userData._id);
        })
    })
})
.catch(err=>console.log(err))


