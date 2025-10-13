// Add missing token column to session table
const { Pool } = require("pg");
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function addSessionToken() {
  console.log("Adding token column to session table...");
  
  try {
    await pool.query(`
      ALTER TABLE session 
      ADD COLUMN IF NOT EXISTS token TEXT
    `);
    console.log("✅ Added token column");

    console.log("\n🎉 Migration complete!");
    await pool.end();
  } catch (error) {
    console.error("❌ Error:", error);
    await pool.end();
    process.exit(1);
  }
}

addSessionToken();

