import express from 'express'
import { accesschat, createGroupChat, deleteGroup, fetchChats, removeFromGroup, renameGroup } from '../controllers/chatController.js';
import auth from '../middlewares/authMiddleware.js';

const router=express.Router();

router.post('/createchat',auth,accesschat);
router.get('/fetchChats',auth,fetchChats);
router.post('/creategroupchat',auth,createGroupChat);
router.put('/renamegchat',auth,renameGroup);
router.put('/removeusers',auth,removeFromGroup);
router.put('/deletegroup',auth,deleteGroup);

export default router;