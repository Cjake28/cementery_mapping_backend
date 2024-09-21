import db from '../../db/db.connect.js';

// Check if user email exists and whether it's verified
export async function queryEmail_and_verified(email) {
    const [result] = await db.query(`
        SELECT email, isVerified FROM users WHERE email = ?
    `, [email]);
    return result;
}

// Create a new user in the database
export async function createUser(name, email, password, verificationToken, verificationCodeExpiresAt, isVerified, role = 'client') {
    const [result] = await db.query(`
        INSERT INTO users (name, email, password, role, isVerified, verificationCode, verificationCodeExpiresAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [name, email, password, role, isVerified, verificationToken, verificationCodeExpiresAt]);

    if (!result || !result.insertId) {
        throw new Error("Failed to create user");
    }
    return result.insertId;
}

// Check if the verification code has expired
export async function checkEmailVerificationExpiredAt(email) {
    const [result] = await db.query(`
        SELECT verificationCodeExpiresAt FROM users WHERE email = ?
    `, [email]);
    
    const expiration = result[0]?.verificationCodeExpiresAt;
    return expiration ? new Date(expiration) < new Date() : false;
}

export async function updateVerificationCode_And_expirery(email, verificationCode, verificationCodeExpiresAt ){
    const [result] = await db.query(`
        UPDATE users 
        SET verificationCode = ?, verificationCodeExpiresAt = ?
        WHERE email = ?
        `, [verificationCode, verificationCodeExpiresAt, email]);
    
    return result;
}



// import db from '../../db/db.connect.js';

// // return an array and inside is object with email & isverified if the email exist, return a empty array if email does not exist
// export async function queryEmail_and_verified(email) {
//     const [result] = await db.query(`
//         SELECT email, isVerified FROM users WHERE email = ?
//     `, [email]);

//     console.log(result);

//     return result;
// }


// export async function Create_User(name, email, password, verificationToken, verificationTokenExpiresAt, role = 'client') {
//     const [result] = await db.query(`
//         INSERT INTO users (name, email, password, role, verificationToken, verificationTokenExpiresAt)
//         VALUES (?, ?, ?, ?, ?, ?)
//     `, [name, email, password, role, verificationToken, verificationTokenExpiresAt]);

//     console.log(result);

//     if (!result || !result.insertId) {
//         throw new Error("Failed to create user");
//     }

//     return result.insertId;
// }

// export async function check_email_varificationExpiredAt(email){
//     const [result] = await db.query(`
//         SELECT verificationCodeExpiresAt FROM users WHERE email = ?
//         `,[email]);
    
//         console.log(result[0]);
//     return result[0];
// }