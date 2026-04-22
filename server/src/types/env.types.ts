export interface NodeEnv {
  NODE_ENV: 'development' | 'production';
  PORT: string;
  // MongoDB
  MONGO_DB_URI: string;
  // JWT
  JWT_SECRET: string;
}
