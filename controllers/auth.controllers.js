import { Email_Exist, Create_User } from '../models/authModel/signup.model.js';
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
        const userAlreadyExist = await Email_Exist(email);

        if (userAlreadyExist) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        console.log("User does not exist");

        // Encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Generate a verification token and expiration date
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

        // Create the new user
        const userCreated = await Create_User(name, email, encryptedPassword, verificationToken, verificationTokenExpiresAt, role);

        console.log("User created with ID:", userCreated);

        generateTokenAndSetCookie(res,userCreated);

        console.log("Signup complete");

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
