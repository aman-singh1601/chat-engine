import express from 'express'
import { accesschat, createGroupChat, fetchChats } from '../controllers/chatController.js';
import auth from '../middlewares/authMiddleware.js';

const router=express.Router();

router.post('/createchat',auth,accesschat);
router.get('/fetchChats',auth,fetchChats);
router.post('/creategroupchat',auth,createGroupChat);

export default router;