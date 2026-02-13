// Importa Express para crear rutas (endpoints) HTTP
const express = require("express");
// Crea un "router" de Express (grupo de rutas para un módulo)
const router = express.Router();

// Convierte y valida el monto que viene en el body de la petición.
function parseAmount(req) {
  const amount = Number(req.body.amount);
  if (!Number.isFinite(amount)) {
    const err = new Error("Amount must be a valid number");
    err.status = 400;
    throw err;
  }
  return amount;
}

//Exporta una función que recibe un accountService (inyección de dependencia),
//reusar rutas y seperar la logica de negocio.
module.exports = (accountService) => {
  router.get("/balance", (req, res) => {
    res.json({ balance: accountService.getBalance() });
  });

  //Realiza un depósito y devuelve el nuevo saldo.
  router.post("/deposit", (req, res, next) => {
    try {
      const amount = parseAmount(req);
      const newBalance = accountService.deposit(amount);
      res.json({ message: "Deposit successful", balance: newBalance });
    } catch (e) {
      next(e);
    }
  });

  //Realiza un retiro y devuelve el nuevo saldo.
  router.post("/withdraw", (req, res, next) => {
    try {
      const amount = parseAmount(req);
      const newBalance = accountService.withdraw(amount);
      res.json({ message: "Withdrawal successful", balance: newBalance });
    } catch (e) {
      next(e);
    }
  });

  return router;
};