const readline = require("readline");
const { AccountService } = require("./account/account.services");

const account = new AccountService(0);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log("\n1. Check balance");
  console.log("2. Deposit");
  console.log("3. Withdraw");
  console.log("4. Exit");

  rl.question("Select an option: ", (option) => {

    if (option === "1") {
      console.log("Current balance:", account.getBalance());
      return menu();
    }

    if (option === "2") {
      rl.question("Enter amount to deposit: ", (input) => {
        try {
          const amount = Number(input);
          const newBalance = account.deposit(amount);
          console.log("Deposit successful. New balance:", newBalance);
        } catch (error) {
          console.log("Error:", error.message);
        }
        menu();
      });
      return;
    }

    if (option === "3") {
      rl.question("Enter amount to withdraw: ", (input) => {
        try {
          const amount = Number(input);
          const newBalance = account.withdraw(amount);
          console.log("Withdrawal successful. New balance:", newBalance);
        } catch (error) {
          console.log("Error:", error.message);
        }
        menu();
      });
      return;
    }

    if (option === "4") {
      console.log("Exiting...");
      rl.close();
      return;
    }

    console.log("Invalid option");
    menu();
  });
}

menu();
