require('dotenv').config();

export const config = {
  development: {
    username: '0mad',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'yolobook',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: '0mad',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'yolobook',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
};
