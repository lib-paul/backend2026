const { describe, it, after } = require('node:test');
const assert = require('node:assert/strict');
const { sequelize, Role, User } = require('../src/models');

describe('Pruebas de Modelos y Relaciones (Sequelize)', () => {
  // Cerramos la conexión al terminar para que la terminal no quede colgada
  after(async () => {
    await sequelize.close();
  });

  it('debería conectarse correctamente a la base de datos', async () => {
    await assert.doesNotReject(async () => {
      await sequelize.authenticate();
    });
  });

  it('debería leer los 3 roles obligatorios del seeder', async () => {
    const roles = await Role.findAll();
    const nombres = roles.map((r) => r.nombre_rol);

    assert.equal(roles.length, 3);
    assert.ok(nombres.includes('ADMIN'));
    assert.ok(nombres.includes('FORENSIC_INSPECTOR'));
    assert.ok(nombres.includes('AUDITOR'));
  });

  it('debería traer los usuarios junto con su rol asociado (JOIN)', async () => {
    const users = await User.findAll({
      include: [{ model: Role, as: 'role' }],
    });

    assert.ok(users.length >= 3, 'Debería haber al menos 3 usuarios precargados');
    // Verificamos que el alias "role" y la Foreign Key estén bien conectados
    assert.ok(users[0].role, 'El usuario debe incluir el objeto role');
    assert.equal(typeof users[0].role.nombre_rol, 'string');
  });
});