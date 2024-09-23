import { queryEmail_and_verified, createUser, deleteUserNotVerified} from '../../models/authModel/signup.model.js';
import bcrypt from 'bcrypt';
import {Send_signup_email_verification} from '../../nodemailer/signup.email.js'


export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    const EmailLower = email.toLowerCase();

    try {
        // Check if all required fields are filled
        if (!EmailLower || !password || !name){
            return res.status(400).json({ message: "Complete the fields" });
        }
        
        // todo: check this function might cause problem
        //check if undef
        // Check if the user already exists
        const existingUser = await queryEmail_and_verified(EmailLower);
        const userExists = existingUser && existingUser.length > 0;
        const isVerified = userExists && existingUser[0].isVerified;

        if (userExists && isVerified) {
            return res.status(400).json({ success: false, message: "User already exists and is verified." });
        }

        if (userExists && !isVerified){
            // Update verification code and its expiration first
            const deletedUser = await deleteUserNotVerified(EmailLower);
            console.log("deletedUser: ",deletedUser);
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
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
        await createUser(name, EmailLower, encryptedPassword, verificationCode, verificationCodeExpiresAt);

        return res.status(201).json({ success: true, message: "User created successfully" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: e.message });
    }
};




