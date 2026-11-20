const sequelize = require('../config/database');
const Role = require('./Role');
const User = require('./User');

// Relaciones (Integridad Referencial)
Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

module.exports = {
  sequelize,
  Role,
  User,
};