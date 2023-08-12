import express from 'express'
import  bodyParser  from 'body-parser'
import 'dotenv/config'
import  mongoose from 'mongoose'
import cors from 'cors'


//importing the router
import userRouter from './routes/users.js'
import chatsRouter from './routes/chats.js'

const app=express();

app.use(bodyParser.json({limit:'300mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'300mb',extended:true}))
app.use(cors());

app.use('/uploads',express.static('uploads'))
app.use('/user', userRouter)
app.use('/chats', chatsRouter)


const PORT =process.env.PORT;
const CONNECTION_URL=process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL)
.then(()=>{
    app.listen(PORT,()=>console.log(`SERVER is running on port : ${PORT}`))
})
.catch(err=>console.log(err))


