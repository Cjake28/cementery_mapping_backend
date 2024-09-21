import { queryEmail_and_verified, createUser, checkEmailVerificationExpiredAt, updateVerificationCode_And_expirery } from '../models/authModel/signup.model.js';
import bcrypt from 'bcrypt';
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js'
export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if all required fields are filled
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Complete the fields" });
        }


        // Check if the user already exists
        const existingUser = await queryEmail_and_verified(email);
        const userExists = existingUser && existingUser.length > 0;
        const isVerified = userExists && existingUser[0].isVerified;

        if (userExists && isVerified) {
            console.log(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' '))
            return res.status(400).json({ success: false, message: "User already exists and is verified." });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

        if (userExists && !isVerified) {

            const updated = await updateVerificationCode_And_expirery(email, verificationCode, verificationCodeExpiresAt);
            
            console.log(updated);
            return res.status(200).json({ success: true, message: "Verification code resent to your email." });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const TOcreateUserverified = 0;

        const newUserId = await createUser(name, email, encryptedPassword, verificationCode, verificationCodeExpiresAt, TOcreateUserverified, role);

       
        return res.status(201).json({ success: true, message: "User created successfully" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: e.message });
    }
}

export const signin = async (req, res) => {
    res.send("signin");
}

export const logout = async (req, res) => {
    res.send("logout");
}
