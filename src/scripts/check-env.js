const nextEnv = require('@next/env');

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const requiredEnvVariables = [
  'DATABASE_URL',
  'BOT_API_TOKEN',
  // Add more required environment variables here
];

const missingEnvVariables = requiredEnvVariables.filter(
  envVar => !process.env[envVar]
);

if (missingEnvVariables.length > 0) {
  console.error('Error: Some required environment variables are missing:');
  missingEnvVariables.forEach(envVar => {
    console.error(`- ${envVar}`);
  });
  process.exit(1);
} else {
  console.log(
    'All required environment variables are set. Proceeding with the build.'
  );
}
