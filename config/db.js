module.exports = {
  HOST: process.env.HOST,
  USER: process.env.DATABASE_USERNAME,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DB: process.env.DATABASE_NAME,
  dialect: 'mysql',
  port: process.env.DB_PORT,
};