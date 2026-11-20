'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Primero creamos la tabla padre (roles)
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre_rol: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    });

    // 2. Luego creamos la tabla hija (users) con la Foreign Key
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    // Orden inverso para respetar la Integridad Referencial
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('roles');
  },
};