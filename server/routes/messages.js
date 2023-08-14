import express from 'express'
import {alllMessage, sendMessage} from "../controllers/messageController.js"
import auth from '../middlewares/authMiddleware.js';

const router=express.Router();

router.post('/sendmessage',auth,sendMessage);
router.get('/getmessages/:chatId',alllMessage);

export default router;