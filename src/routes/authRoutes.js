import express from 'express';
import {register,login,logout,getProfile,updateProfile} from '../controllers/authController.js';
import {authenticate} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

export default router;