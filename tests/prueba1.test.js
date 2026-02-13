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
