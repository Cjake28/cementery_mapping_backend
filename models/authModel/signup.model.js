import db from '../../db/db.connect.js';

// Check if user email exists and whether it's verified
export async function queryEmail_and_verified(email) {
    try {
        const [result] = await db.query(`
            SELECT email, isVerified FROM users WHERE email = ?
        `, [email]);

        return result;
    } catch (error) {
        console.error('Error querying email:', error);
        throw new Error('signupModel, queryEmail_and_verified: Database update failed')
    }
}

// Create a new user in the database
export async function createUser(name, email, password, verificationToken, verificationCodeExpiresAt, role = 'user') {
    try {
        const [result] = await db.query(`
            INSERT INTO users (name, email, password, role, verificationCode, verificationCodeExpiresAt)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [name, email, password, role, verificationToken, verificationCodeExpiresAt]);

        if (!result || !result.insertId) {
            throw new Error("Failed to create user");
        }
        return result.insertId;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('signupModel, createUser: Database update failed')
    }
}

// Check if the verification code has expired
export async function checkEmailVerificationExpiredAt(email) {
    try {
        const [result] = await db.query(`
            SELECT verificationCodeExpiresAt FROM users WHERE email = ?
        `, [email]);

        const expiration = result[0]?.verificationCodeExpiresAt;
        return expiration ? new Date(expiration) < new Date() : false;
    } catch (error) {
        console.error('Error checking verification code expiration:', error);
        throw new Error('signupModel, checkEmailVerificationExpiredAt: Database update failed')
    }
}

// Update the verification code and its expiration
export async function updateVerificationCode_And_expirery(email, verificationCode, verificationCodeExpiresAt) {
    try {
        const [result] = await db.query(`
            UPDATE users 
            SET verificationCode = ?, verificationCodeExpiresAt = ?
            WHERE email = ?
        `, [verificationCode, verificationCodeExpiresAt, email]);

        return result;
    } catch (error) {
        console.error('Error updating verification code:', error);
        throw new Error('signupModel, updateVerificationCode_And_expirery: Database update failed')
    }
}

export async function deleteUserNotVerified(email){
    try{
        const [result] = await db.query(`
            DELETE FROM users WHERE email=?;
        `,[email]);
        console.log(result);
        return result;
    }catch(error){
        console.error('Error deleteUserNotVerified', error);
        throw new Error('signupModel, deleteUserNotVerified: Database update failed')
    }
    
}

