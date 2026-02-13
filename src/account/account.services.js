// Clase que representa la lógica de negocio de una cuenta de ahorros.
class AccountService {
  constructor(initialBalance = 0) {
    if (!Number.isFinite(initialBalance) || initialBalance < 0) {
      throw new Error("Initial balance must be a non-negative number");
    }
    this.balance = initialBalance;
  }

  //Devuelve el saldo actual.
  getBalance() {
    return this.balance;
  }

   //Deposita dinero en la cuenta.
   //Reglas:
   //Debe ser número válido
   //Debe ser mayor que 0
  deposit(amount) {
    if (!Number.isFinite(amount)) throw new Error("Amount must be a valid number");
    if (amount <= 0) throw new Error("Amount must be greater than 0");

    this.balance += amount;
    return this.balance; // <- IMPORTANTE
  }

   //Retira dinero de la cuenta.
   //Reglas:
   //Debe ser número válido
   //Debe ser mayor que 0
   //No puede ser mayor al saldo (saldo insuficiente)
    
  withdraw(amount) {
    if (!Number.isFinite(amount)) throw new Error("Amount must be a valid number");
    if (amount <= 0) throw new Error("Amount must be greater than 0");
    if (amount > this.balance) throw new Error("Insufficient funds");

    this.balance -= amount;
    return this.balance; // <- IMPORTANTE
  }
}

// Exporta la clase para poder usarla en otros archivos.
module.exports = { AccountService };
