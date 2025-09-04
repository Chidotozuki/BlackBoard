import express from 'express';
import {login, signup, updateProfile, changePassword } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.put('/profile', authenticate, updateProfile);
router.put('/change-password', authenticate, changePassword);

// later
// router.post('/request-reset', requestPasswordReset);
// router.post('/verify-otp', verifyOtp);
// router.post('/reset-password', resetPassword);

export default router;
