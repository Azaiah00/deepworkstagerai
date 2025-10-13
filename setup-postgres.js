// Manual database setup script for PostgreSQL (Neon)
const { Pool } = require("pg");
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function setupDatabase() {
  console.log("Setting up Better Auth database tables in PostgreSQL...");
  
  try {
    // Create user table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        "emailVerified" BOOLEAN NOT NULL DEFAULT false,
        name TEXT,
        image TEXT,
        company TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    console.log("✅ Created user table");

    // Create session table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS session (
        id TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "expiresAt" TIMESTAMP NOT NULL,
        "ipAddress" TEXT,
        "userAgent" TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE
      )
    `);
    console.log("✅ Created session table");

    // Create account table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS account (
        id TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "accountId" TEXT NOT NULL,
        "providerId" TEXT NOT NULL,
        "accessToken" TEXT,
        "refreshToken" TEXT,
        "idToken" TEXT,
        "accessTokenExpiresAt" TIMESTAMP,
        "refreshTokenExpiresAt" TIMESTAMP,
        scope TEXT,
        password TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE
      )
    `);
    console.log("✅ Created account table");

    // Create verification table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS verification (
        id TEXT PRIMARY KEY,
        identifier TEXT NOT NULL,
        value TEXT NOT NULL,
        "expiresAt" TIMESTAMP NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    console.log("✅ Created verification table");

    console.log("\n🎉 Database setup complete!");
    await pool.end();
  } catch (error) {
    console.error("❌ Error setting up database:", error);
    await pool.end();
    process.exit(1);
  }
}

setupDatabase();

