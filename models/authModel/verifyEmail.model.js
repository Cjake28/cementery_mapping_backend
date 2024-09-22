import db from '../../db/db.connect.js';

// Query verification code and expiration
export async function qryVerCode_and_expiresAt(email) {
    try {
        const [result] = await db.query(`
            SELECT verificationCode, verificationCodeExpiresAt FROM users WHERE email = ?
        `, [email]);
        return result;
    } catch (error) {
        console.error('Error querying verificationCode verificationCodeExpiresAt:', error);
        throw new Error('verifyEmail: Database query failed');
    }
}

// Mark user as verified
export async function verified_a_user(email) {
    try {
        const [result] = await db.query(`
            UPDATE users 
            SET isVerified = true
            WHERE email = ?
        `, [email]);  // Fix: Pass email as the parameter
        return result;
    } catch (error) {
        console.error('Error in verified_a_user:', error);
        throw new Error('verifyEmail: Database query failed');
    }
}

// Reset verification code and expiry fields to null
export async function resetVerificationCodeAndExpiry(email) {
    try {
        const [result] = await db.query(`
            UPDATE users 
            SET verificationCode = NULL, verificationCodeExpiresAt = NULL
            WHERE email = ?
        `, [email]);
        return result;
    } catch (error) {
        console.error('Error resetting verification code and expiry:', error);
        throw new Error('verifyEmail: Database query failed');
    }
}
