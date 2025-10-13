// Manual database setup script for Turso
const { createClient } = require("@libsql/client");
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:./auth.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function setupDatabase() {
  console.log("Setting up Better Auth database tables...");
  
  try {
    // Create user table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS user (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        emailVerified INTEGER NOT NULL DEFAULT 0,
        name TEXT,
        image TEXT,
        company TEXT,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL
      )
    `);
    console.log("✅ Created user table");

    // Create session table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS session (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        expiresAt INTEGER NOT NULL,
        ipAddress TEXT,
        userAgent TEXT,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
      )
    `);
    console.log("✅ Created session table");

    // Create account table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS account (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        accountId TEXT NOT NULL,
        providerId TEXT NOT NULL,
        accessToken TEXT,
        refreshToken TEXT,
        idToken TEXT,
        expiresAt INTEGER,
        password TEXT,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
      )
    `);
    console.log("✅ Created account table");

    // Create verification table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS verification (
        id TEXT PRIMARY KEY,
        identifier TEXT NOT NULL,
        value TEXT NOT NULL,
        expiresAt INTEGER NOT NULL,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL
      )
    `);
    console.log("✅ Created verification table");

    console.log("\n🎉 Database setup complete!");
  } catch (error) {
    console.error("❌ Error setting up database:", error);
    process.exit(1);
  }
}

setupDatabase();

