import db from '../../db/db.connect.js';

export async function qryVerCode_and_expiresAt(email) {
    try {
        const [result] = await db.query(`
            SELECT verificationCode, verificationCodeExpiresAt FROM users WHERE email = ?
        `, [email]);
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error querying verificationCode verificationCodeExpiresAt:', error);
        throw new Error('verifyEmail:Database query failed');
    }
}

export async function verified_a_user(email){
    try{
        const [result] = await db.query(`
            UPDATE users 
            SET isVerified = true
            WHERE email = ?
        `[email]);
    }catch(e){
        console.error('Error verified_a_user:', error);
        throw new Error('verifyEmail:Database query failed');
    }
}

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
        throw new Error('verifyEmail:Database query failed');
    }
}
