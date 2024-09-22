import { qryVerCode_and_expiresAt, verified_a_user, resetVerificationCodeAndExpiry } from '../../models/authModel/verifyEmail.model.js';
import { generateTokenAndSetCookie } from '../../utils/generateTokenAndSetCookie.js';

export const verifyEmail = async (req, res) => {
    const { email, code } = req.body;
    const EmailLower = email.toLowerCase();

    try {
        // Check if the fields are complete
        if (!EmailLower || !code) {
            return res.status(400).json({ message: "Complete the fields" });
        }

        // Get verification code and expiration date from the database
        const verCode_and_expiresAt = await qryVerCode_and_expiresAt(EmailLower);
        const verificationCode = verCode_and_expiresAt[0]?.verificationCode;
        const verificationCodeExpiresAt = verCode_and_expiresAt[0]?.verificationCodeExpiresAt;

        // Check if the verification code has expired
        if (!verificationCodeExpiresAt || new Date(verificationCodeExpiresAt) < new Date()) {
            return res.status(400).json({ success: false, message: "Verification code expired, please try again" });
        }

        // Check if the verification code is correct
        if (verificationCode !== code) {
            return res.status(400).json({ success: false, message: "Wrong verification code" });
        }

        // Mark the user as verified
        await verified_a_user(EmailLower);

        // Reset the verification code and its expiration
        await resetVerificationCodeAndExpiry(EmailLower);

        // Generate a JWT token and set it as a cookie
        const userPayload = { email: EmailLower };  
        generateTokenAndSetCookie(res, userPayload);

        // Respond with success message
        return res.status(200).json({ success: true, message: "Email verified successfully" });

    } catch (err) {
        console.error("Error verifying email:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
