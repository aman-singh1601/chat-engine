import express from 'express'
import { login, signup } from '../controllers/usersController.js';
import multer from 'multer'
const router=express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profilePic')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"-"+file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post('/login',login);
router.post('/signup',upload.single('pic'),signup);

export default router;
