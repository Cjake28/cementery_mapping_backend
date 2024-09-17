// import bcrypt from 'bcrypt';
// import mysql from 'mysql2';
// import dotenv from 'dotenv';

// dotenv.config();

// const password = 'password123'

// // console.log('Environment variables:', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD);
// const encryptedPassword = await bcrypt.hash(password,10);

// console.log(encryptedPassword);

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     port: process.env.DB_PORT
// }).promise();

// async function Create_user(){
//     try{
//         const [result] = await pool.query(`
//            INSERT INTO users (name, email, password, role)
//             VALUES (?, ?, ?, ?)
//         `, ['Himlayang Lahing Kayumangi', 'admin@gmail.com', encryptedPassword, 'admin']);
//         console.log(result);
//         return result;
//     }catch(e){
//         console.log(e);
//     }
// }

// Create_user();



