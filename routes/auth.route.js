import express from 'express';
import {signup, signin, logout} from '../controllers/auth/signup.controller.js';
import {verifyEmail} from '../controllers/auth/verifyEmail.controller.js'
const router = express.Router();

router.post("/signup",signup);

router.post("/verify-email",verifyEmail);

router.post("/signin",signin);

router.post("/logout",logout);

export default router;