// Importa la clase AccountService para que cada persona tenga una cuenta asociada
const { AccountService } = require("../account/account.services");

// Clase que representa a una persona (cliente) del sistema.
// Una persona "tiene" una cuenta (composición): Person -> AccountService.
class Person {
  constructor({ id, name, initialBalance = 0 } = {}) {
    // Validaciones básicas
    if (!id || typeof id !== "string") {
      throw new Error("Person id must be a non-empty string");
    }
    if (!name || typeof name !== "string") {
      throw new Error("Person name must be a non-empty string");
    }

    this.id = id;
    this.name = name;

    // Cada persona tiene su propia cuenta
    this.account = new AccountService(initialBalance);
  }

  //Devuelve el saldo actual de la cuenta de la persona.
  getBalance() {
    return this.account.getBalance();
  }
  //Deposita un monto en la cuenta de la persona.
  deposit(amount) {
    return this.account.deposit(amount);
  }
  //Retira un monto de la cuenta de la persona.
  withdraw(amount) {
    return this.account.withdraw(amount);
  }
}

// Exporta la clase Person para usarla en otras partes del sistema.
module.exports = { Person };