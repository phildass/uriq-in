const { existsSync, readFileSync } = require("fs");
const { resolve } = require("path");

/**
 * Load env variables from uriq.env for local/prod parity.
 * Add these keys in Hostinger Environment Variables dashboard too.
 */
function loadUriqEnv() {
  const envPath = resolve(process.cwd(), "uriq.env");
  if (!existsSync(envPath)) return;

  const content = readFileSync(envPath, "utf8");

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.includes("=") ? "=" : ":";
    const splitIndex = trimmed.indexOf(separator);
    if (splitIndex === -1) continue;

    const key = trimmed.slice(0, splitIndex).trim();
    const value = trimmed.slice(splitIndex + 1).trim();
    if (!key || !value) continue;

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_KEY && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  }
}

loadUriqEnv();

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
