import express from 'express'
import { allusers, login, signup } from '../controllers/usersController.js';
import multer from 'multer'
import auth from '../middlewares/authMiddleware.js';
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
router.get('/findusers',auth,allusers)


export default router;
