// Importa Express para crear la aplicación (servidor) y manejar rutas HTTP
const express = require("express");
// Importa la lógica de negocio de la cuenta
const { AccountService } = require("./account/account.service");
// Importa la fábrica de rutas
const accountRoutesFactory = require("./account/account.routes");

//Crea y configura la aplicación Express.
function createApp() {
  // Crea la app de Express
  const app = express();
  app.use(express.json());

  const accountService = new AccountService(0);

  app.use("/api/account", accountRoutesFactory(accountService));

  //Manejador global de errores.
  //Si una ruta lanza error y llama next(err), este middleware responde al cliente.

  app.use((err, req, res, next) => {
    const status = err.status || 400;

    res.status(status).json({
      error: err.message || "Unexpected error"
    });
  });

  return app;
}

// Exporta la función createApp para usarla en server.js o en pruebas
module.exports = { createApp };