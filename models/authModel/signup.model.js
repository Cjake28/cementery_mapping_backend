import db from '../../db/db.connect.js';

export async function Email_Exist(email) {
    const [result] = await db.query(`
        SELECT email FROM users WHERE email = ?
    `, [email]);

    console.log(result);

    if (result.length === 0) {
        return false;
    }

    return true;
}

export async function Create_User(name, email, password, verificationToken, verificationTokenExpiresAt, role = 'client') {
    const [result] = await db.query(`
        INSERT INTO users (name, email, password, role, verificationToken, verificationTokenExpiresAt)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [name, email, password, role, verificationToken, verificationTokenExpiresAt]);

    console.log(result);

    if (!result || !result.insertId) {
        throw new Error("Failed to create user");
    }

    return result.insertId;
}
