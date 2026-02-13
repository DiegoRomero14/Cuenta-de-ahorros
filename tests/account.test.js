// Importa la clase AccountService desde el archivo donde está definida.
const { AccountService } = require("../src/account/account.services");



// Agrupa todas las pruebas unitarias relacionadas con AccountService.
describe("Savings Account - Unit Tests (AccountService)", () => {
  // CP-06 Consultar saldo
  test("CP-06 | should return current balance", () => {
    // Crea una cuenta con saldo inicial de 180.000
    const account = new AccountService(180000);
    // Verifica que getBalance retorne exactamente el saldo inicial
    expect(account.getBalance()).toBe(180000);
  });




  // CP-03 Depósito exitoso
  test("CP-03 | deposit should increase balance", () => {
    // Crea una cuenta con saldo inicial de 100.000
    const account = new AccountService(100000);
    // Deposita 100.000 y guarda el saldo retornado por deposit
    const newBalance = account.deposit(100000);
    // Verifica que el saldo retornado sea 200.000
    expect(newBalance).toBe(200000);
    // Verifica que el saldo interno también sea 200.000
    expect(account.getBalance()).toBe(200000);
  });





  // CP-04 No permitir depósito negativo
  test("CP-04 | deposit negative should throw error and not change balance", () => {
    // Crea una cuenta con saldo inicial de 100.000
    const account = new AccountService(100000);
    // Espera que al depositar un valor negativo lance error
    expect(() => account.deposit(-10000)).toThrow("greater than 0");
    // Verifica que el saldo NO cambió después del intento inválido
    expect(account.getBalance()).toBe(100000);
  });





  // CP-05 No permitir depósito en cero
  test("CP-05 | deposit zero should throw error and not change balance", () => {
    // Crea una cuenta con saldo inicial de 100.000
    const account = new AccountService(100000);
    // Espera que depositar 0 lance error
    expect(() => account.deposit(0)).toThrow("greater than 0");
    // Verifica que el saldo NO cambió
    expect(account.getBalance()).toBe(100000);
  });




  // CP-02 Retiro exitoso
  test("CP-02 | withdraw should decrease balance", () => {
    // Crea una cuenta con saldo inicial de 200.000
    const account = new AccountService(200000);
    // Retira 50.000 y guarda el saldo actualizado
    const newBalance = account.withdraw(50000);
    // Verifica que el saldo final sea 150.000
    expect(newBalance).toBe(150000);
    // Verifica que el saldo interno también sea 150.000
    expect(account.getBalance()).toBe(150000);
  });




  // CP-01 Saldo insuficiente
  test("CP-01 | withdraw with insufficient funds should throw and not change balance", () => {
    // Crea una cuenta con saldo inicial de 100.000
    const account = new AccountService(100000);
    // Espera que retirar más del saldo lance error
    expect(() => account.withdraw(150000)).toThrow("Insufficient funds");
    // Verifica que el saldo NO cambió tras el intento fallido
    expect(account.getBalance()).toBe(100000);
  });





  // CP-07 No permitir texto/no numérico
  test("CP-07 | non-numeric amount should throw", () => {
    // Crea una cuenta con saldo inicial de 100.000
    const account = new AccountService(100000);

    // Number("abc") => NaN
    // Se espera que deposit y withdraw lancen error por monto inválido
    expect(() => account.deposit(Number("abc"))).toThrow("valid number");
    expect(() => account.withdraw(Number("abc"))).toThrow("valid number");
    // Verifica que el saldo no cambió
    expect(account.getBalance()).toBe(100000);
  });




  // CP-08 No permitir retiro negativo
  test("CP-08 | withdraw negative should throw and not change balance", () => {
    // Crea una cuenta con saldo inicial de 200.000
    const account = new AccountService(200000);
    // Espera error al retirar un valor negativo
    expect(() => account.withdraw(-20000)).toThrow("greater than 0");
    // Verifica que el saldo permanece igual
    expect(account.getBalance()).toBe(200000);
  });





  // CP-09 Retirar exactamente el saldo (caso borde)
  test("CP-09 | withdraw exact balance should set balance to 0", () => {
    // Crea una cuenta con saldo inicial de 80.000
    const account = new AccountService(80000);
    // Retira todo el saldo
    const newBalance = account.withdraw(80000);
     // Se espera que el saldo final sea 0
    expect(newBalance).toBe(0);
    expect(account.getBalance()).toBe(0);
  });


  
  // simula un flujo típico: depositar -> retirar -> consultar saldo.
  test("Integration | deposit then withdraw then check balance", () => {
    // Crea una cuenta en 0
    const account = new AccountService(0);
    // Deposita 200.000
    account.deposit(200000);
    // Retira 50.000
    account.withdraw(50000);
    // Verifica el saldo final esperado: 150.000
    expect(account.getBalance()).toBe(150000);
  });
});