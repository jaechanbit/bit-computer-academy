import "dotenv/config";

const requiredVariables = [
  "DATABASE_URL",
  "SESSION_SECRET",
  "ADMIN_USERNAME",
  "ADMIN_INITIAL_PASSWORD",
  "ADMIN_NAME",
  "NEXT_PUBLIC_SITE_URL",
];

const missingVariables = requiredVariables.filter((name) => !process.env[name]?.trim());

if (missingVariables.length > 0) {
  console.error("Missing required environment variables:");
  for (const name of missingVariables) {
    console.error(`- ${name}`);
  }
  process.exit(1);
}

const databaseUrl = process.env.DATABASE_URL ?? "";
const directUrl = process.env.DIRECT_URL ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
const sessionSecret = process.env.SESSION_SECRET ?? "";
const adminInitialPassword = process.env.ADMIN_INITIAL_PASSWORD ?? "";

const placeholderPatterns = [
  "[YOUR-PASSWORD]",
  "SUPABASE_TRANSACTION_POOLER_URL_PORT_6543",
  "SUPABASE_SESSION_POOLER_URL_PORT_5432",
  "change-this-admin-password",
  "change-this-password",
];

const placeholderVariables = [
  ["DATABASE_URL", databaseUrl],
  ["DIRECT_URL", directUrl],
  ["ADMIN_INITIAL_PASSWORD", adminInitialPassword],
].filter(([, value]) =>
  placeholderPatterns.some((placeholder) => value.includes(placeholder)),
);

if (placeholderVariables.length > 0) {
  console.error("Replace placeholder values before connecting to Supabase:");
  for (const [name] of placeholderVariables) {
    console.error(`- ${name}`);
  }
  process.exit(1);
}

if (!databaseUrl.startsWith("postgresql://") && !databaseUrl.startsWith("postgres://")) {
  console.error("DATABASE_URL must be a PostgreSQL connection string.");
  process.exit(1);
}

if (directUrl && !directUrl.startsWith("postgresql://") && !directUrl.startsWith("postgres://")) {
  console.error("DIRECT_URL must be a PostgreSQL connection string when provided.");
  process.exit(1);
}

if (!siteUrl.startsWith("http://") && !siteUrl.startsWith("https://")) {
  console.error("NEXT_PUBLIC_SITE_URL must start with http:// or https://.");
  process.exit(1);
}

if (sessionSecret.length < 32) {
  console.error("SESSION_SECRET should be at least 32 characters long.");
  process.exit(1);
}

console.log("Environment variables look ready.");
