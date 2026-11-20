'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('roles', [
      { id: 1, nombre_rol: 'ADMIN' },
      { id: 2, nombre_rol: 'FORENSIC_INSPECTOR' },
      { id: 3, nombre_rol: 'AUDITOR' },
    ]);

    await queryInterface.bulkInsert('users', [
      { username: 'jefe_peritos', role_id: 1, active: true, created_at: new Date() },
      { username: 'perito_uno', role_id: 2, active: true, created_at: new Date() },
      { username: 'auditor_central', role_id: 3, active: true, created_at: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  },
};