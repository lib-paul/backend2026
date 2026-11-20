const createError = require('http-errors');
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

module.exports = {
  getPeritos,
  getPeritoById,
};