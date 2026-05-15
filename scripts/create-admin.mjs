/**
 * Creates the admin auth account (no profiles row — admin is separate from members).
 * Run: npm run create-admin
 *
 * Admin UI login:
 *   Email:    admin.mjchits@gmail.com
 *   Password: Admin@12345
 *   URL:      http://localhost:5173/admin/login
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const ADMIN_EMAIL = "admin.mjchits@gmail.com";
const ADMIN_PASSWORD = "Admin@12345";

function loadEnv() {
  const envPath = resolve(root, ".env");
  if (!existsSync(envPath)) {
    throw new Error(".env file not found");
  }

  const lines = readFileSync(envPath, "utf8").split("\n");
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    env[key] = rest.join("=").trim();
  }
  return env;
}

const env = loadEnv();
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY);

async function main() {
  console.log("Creating admin auth account (no member profile)...\n");

  const { data, error } = await supabase.auth.signUp({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });

  if (error) {
    if (error.message.toLowerCase().includes("already registered")) {
      console.log("Admin account already exists in Supabase Auth.\n");
      printCredentials();
      return;
    }
    console.error("Failed:", error.message);
    process.exit(1);
  }

  if (!data.user) {
    console.log("Check Supabase: disable email confirmation for Auth → Email provider.\n");
  } else {
    console.log("Admin auth account created.\n");
  }

  printCredentials();
}

function printCredentials() {
  console.log("--- Admin login ---");
  console.log("URL:      http://localhost:5173/admin/login");
  console.log("Email:    admin.mjchits@gmail.com");
  console.log("Password: Admin@12345");
  console.log("Dashboard: http://localhost:5173/admin");
  console.log("-------------------\n");
  console.log("Run supabase/migrations/20260515300000_admin_email_policy.sql in SQL Editor.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
