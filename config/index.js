require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'product',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbname: process.env.DB_NAME
};

module.exports  = {config};