import express from 'express';
import { auth, logout, sendOtp, verifyOtp } from './../controllers/authController';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/auth', auth);
router.post('/logout', logout);

export default router;
