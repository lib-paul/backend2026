const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_ENGINE === 'postgres') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './forensics.db',
    logging: false,
  });
}

module.exports = sequelize;