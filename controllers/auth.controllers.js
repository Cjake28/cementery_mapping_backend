import { queryEmail_and_verified, createUser, checkEmailVerificationExpiredAt, updateVerificationCode_And_expirery } from '../models/authModel/signup.model.js';
import bcrypt from 'bcrypt';
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js'
import {Send_signup_email_verification} from '../nodemailer/signup.email.js'

export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    const EmailLower = email.toLowerCase();

    try {
        // Check if all required fields are filled
        if (!EmailLower || !password || !name) {
            return res.status(400).json({ message: "Complete the fields" });
        }

        // Check if the user already exists
        const existingUser = await queryEmail_and_verified(EmailLower);
        const userExists = existingUser && existingUser.length > 0;
        const isVerified = userExists && existingUser[0].isVerified;

        if (userExists && isVerified) {
            return res.status(400).json({ success: false, message: "User already exists and is verified." });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

        if (userExists && !isVerified) {
            // Update verification code and its expiration first
            await updateVerificationCode_And_expirery(EmailLower, verificationCode, verificationCodeExpiresAt);

            try {
                // Send verification email after updating the code
                const emailsend = await Send_signup_email_verification(EmailLower, verificationCode);
                console.log(emailsend.response);
                return res.status(200).json({ success: true, message: "Verification code resent to your email." });
            } catch (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ success: false, message: "Failed to resend verification email. Please try again." });
            }
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        try {
            // Send email verification for new users
            const emailsend = await Send_signup_email_verification(EmailLower, verificationCode);
            console.log(emailsend.response);
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: "Failed to send verification email. Please try again." });
        }

        // Create new user in the database
        await createUser(name, EmailLower, encryptedPassword, verificationCode, verificationCodeExpiresAt, role);

        return res.status(201).json({ success: true, message: "User created successfully" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: e.message });
    }
};

export const verifyEmail = async(req,res)=>{
    const {email, code} = req.body;

    

}
export const signin = async (req, res) => {
    res.send("signin");
}

export const logout = async (req, res) => {
    res.send("logout");
}
