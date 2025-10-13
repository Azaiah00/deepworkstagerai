// Add missing columns to account table
const { Pool } = require("pg");
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function addMissingColumns() {
  console.log("Adding missing columns to account table...");
  
  try {
    // Add accessTokenExpiresAt column
    await pool.query(`
      ALTER TABLE account 
      ADD COLUMN IF NOT EXISTS "accessTokenExpiresAt" TIMESTAMP
    `);
    console.log("✅ Added accessTokenExpiresAt column");

    // Add refreshTokenExpiresAt column
    await pool.query(`
      ALTER TABLE account 
      ADD COLUMN IF NOT EXISTS "refreshTokenExpiresAt" TIMESTAMP
    `);
    console.log("✅ Added refreshTokenExpiresAt column");

    // Add scope column
    await pool.query(`
      ALTER TABLE account 
      ADD COLUMN IF NOT EXISTS scope TEXT
    `);
    console.log("✅ Added scope column");

    console.log("\n🎉 Migration complete!");
    await pool.end();
  } catch (error) {
    console.error("❌ Error:", error);
    await pool.end();
    process.exit(1);
  }
}

addMissingColumns();

