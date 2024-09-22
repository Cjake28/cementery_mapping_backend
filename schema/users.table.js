import db from '../db/db.connect.js'

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      lastLogin DATETIME,
      role VARCHAR(50) DEFAULT 'user',
      isVerified BOOLEAN DEFAULT false,
      resetPasswordCode VARCHAR(255),
      resetPasswordCodeExpiresAt DATETIME,
      verificationCode VARCHAR(255),
      verificationCodeExpiresAt DATETIME,
      verificationCodeSentAt DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
};

export default createUsersTable;