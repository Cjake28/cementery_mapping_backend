import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: 'supnetcjs@gmail.com',
    pass: 'izre sbdj binu unxm'
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  }
});

export default transporter;