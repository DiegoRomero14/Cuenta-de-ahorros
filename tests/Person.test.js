// Importa la clase Person desde el archivo donde está definida.
const { Person } = require("/src/person/person-model");


// Agrupa las pruebas unitarias relacionadas con la clase Person
describe("Person - Unit Tests", () => {

  // Prueba: crear una persona con cuenta y saldo inicial
  test("should create a person with an account and initial balance", () => {
    const p = new Person({ id: "1", name: "Santiago", initialBalance: 100000 });
    // Verifica que el saldo inicial de su cuenta sea el esperado
    expect(p.getBalance()).toBe(100000);
  });

   // Prueba: depositar y retirar usando los métodos de Person
  test("should allow deposit and withdraw through person", () => {
    const p = new Person({ id: "1", name: "Santiago", initialBalance: 100000 });

    // Deposita 50.000 a través de la persona (internamente llama account.deposit)
    p.deposit(50000);
    // Verifica que el saldo ahora sea 150.000
    expect(p.getBalance()).toBe(150000);
    // Retira 20.000 a través de la persona (internamente llama account.withdraw)
    p.withdraw(20000);
    // Verifica que el saldo final sea 130.000
    expect(p.getBalance()).toBe(130000);
  });

  // Prueba: validación de ID inválido (vacío)
  test("should throw error if id is invalid", () => {
    // Se espera que al crear una persona con id vacío lance un error
    expect(() => new Person({ id: "", name: "Santiago", initialBalance: 0 }))
      .toThrow("Person id must be a non-empty string");
  });

  // Prueba: validación de nombre inválido (vacío)
  test("should throw error if name is invalid", () => {
    // Se espera que al crear una persona con nombre vacío lance un error
    expect(() => new Person({ id: "1", name: "", initialBalance: 0 }))
      .toThrow("Person name must be a non-empty string");
  });
});