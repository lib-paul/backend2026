const createError = require('http-errors');
const chalk = require('chalk');
const { User, Role } = require('../models');

// GET /api/v1/peritos (con filtro opcional ?role=ADMIN)
const getPeritos = async (req, res, next) => {
  try {
    const { role } = req.query;

    const includeRole = {
      model: Role,
      as: 'role',
      attributes: ['nombre_rol'],
      required: false, // LEFT JOIN por defecto
    };

    if (role) {
      includeRole.where = { nombre_rol: role.toUpperCase() };
      includeRole.required = true; // Filtra solo los que tienen ese rol
    }

    const peritos = await User.findAll({
      where: { active: true },
      include: [includeRole],
    });

    return res.json(peritos);
  } catch (err) {
    return next(err);
  }
};

// GET /api/v1/peritos/:id
const getPeritoById = async (req, res, next) => {
  try {
    const perito = await User.findOne({
      where: {
        id: req.params.id,
        active: true,
      },
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['nombre_rol'],
        },
      ],
    });

    if (!perito) {
      return next(createError(404, 'Perito no encontrado o dado de baja'));
    }

    return res.json(perito);
  } catch (err) {
    return next(err);
  }
};

// POST /api/v1/peritos
const createPerito = async (req, res, next) => {
  try {
    const { username, role_id } = req.body;

    // 1. Validar que username no esté vacío
    if (!username || typeof username !== 'string' || username.trim() === '') {
      console.log(chalk.yellow('[VALIDACIÓN] Campo fallido: username está vacío o es inválido'));
      return next(createError(400, 'El nombre de usuario no puede estar vacío'));
    }

    // 2. Validar que el rol exista en la tabla roles
    const roleExists = role_id ? await Role.findByPk(role_id) : null;
    if (!roleExists) {
      console.log(chalk.yellow(`[VALIDACIÓN] Campo fallido: role_id (${role_id}) no existe`));
      return next(createError(400, 'El ID del rol no existe'));
    }

    // 3. Crear el perito
    const newUser = await User.create({
      username: username.trim(),
      role_id,
    });

    console.log(chalk.cyan('[ALTA PERITO] Nuevo registro:', JSON.stringify(newUser.toJSON())));
    return res.status(201).json(newUser);
  } catch (err) {
    // 4. Si el username ya existe -> 409 Conflict
    if (err.name === 'SequelizeUniqueConstraintError') {
      console.log(chalk.yellow('[VALIDACIÓN] Campo fallido: username ya existe (duplicado)'));
      return next(createError(409, 'El username ya existe'));
    }
    return next(err);
  }
};

module.exports = {
  getPeritos,
  getPeritoById,
  createPerito,
};