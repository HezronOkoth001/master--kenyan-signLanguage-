const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");
require("dotenv").config();

const adminEmail = process.env.ADMIN_EMAIL || "admin@ksl.local";
const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY admins_email_unique (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    const passwordHash = await bcrypt.hash(adminPassword, 12);
    const [result] = await connection.execute(
      `INSERT IGNORE INTO admins (email, password) VALUES (?, ?)`,
      [adminEmail, passwordHash]
    );

    if (result.affectedRows === 1) {
      console.log(`Default admin created: ${adminEmail}`);
    } else {
      console.log(`Admin already exists: ${adminEmail}`);
    }
  } finally {
    await connection.end();
  }
}

migrate().catch((error) => {
  console.error("Admin migration failed:", error.message);
  process.exitCode = 1;
});