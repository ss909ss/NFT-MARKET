import express from 'express';
import {register,login,logout,getProfile,updateProfile,getUserMessages} from '../controllers/authController.js';
import {authenticate} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/profile',  getProfile);
router.put('/profile',  updateProfile);
router.get('/messages',getUserMessages);

export default router;