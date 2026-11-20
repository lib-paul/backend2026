const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_ENGINE === 'postgres') {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      logging: false,
    }
  );
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './forensics.db',
    logging: false,
  });
}

module.exports = sequelize;