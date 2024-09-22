import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: process.env.nodemailerEmail,
    pass: process.env.nodemailerEmailPass
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  }
});

export default transporter;