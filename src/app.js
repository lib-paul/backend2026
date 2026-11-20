const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
require('dotenv').config();

const peritosRoutes = require('./routes/peritos.routes');

const app = express();

// 1. Middlewares globales
app.use(express.json());
app.use(morgan('dev'));

// 2. Rutas
app.use('/api/v1/peritos', peritosRoutes);

// 3. Middleware centralizado de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    console.error(chalk.red('[ERROR CRÍTICO 500]\n', err.stack));
  }
  res.status(status).json({
    error: err.message || 'Error interno del servidor',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});