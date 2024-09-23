import express from 'express';
import {signup} from '../controllers/auth/signup.controller.js';
import {verifyEmail} from '../controllers/auth/verifyEmail.controller.js'
import {signout} from '../controllers/auth/signout.controller.js';
import {signin} from '../controllers/auth/signin.controller.js'
const router = express.Router();

router.post("/signup",signup);

router.post("/verify-email",verifyEmail);

router.post("/signin",signin);

router.post("/signout",signout);

export default router;