import chalk from "chalk";
import inquirer from "inquirer";
import {
  checkBalance,
  createAccount,
  deposit,
  withdraw,
} from "./operations.js";

// choose system operation
export function systemInit() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [
          "Create an Account",
          "Balance",
          "Deposit",
          "Withdraw",
          "Exit",
        ],
      },
    ])
    .then((choice) => {
      const { action } = choice;
      console.clear();
      if (action === "Create an Account") {
        createAccount();
      }
      if (action === "Balance") {
        checkBalance();
      }
      if (action === "Deposit") {
        deposit();
      }
      if (action === "Withdraw") {
        withdraw();
      }
      if (action === "Exit") {
        console.log(chalk.bgRed.black(`      Exit      \n`));
        console.log(chalk.yellow("Thank you for using our services!"));
        setTimeout(() => {
          console.clear();
          process.exit(0);
        }, 2500);
      }
    })
    .catch((err) => console.log(err));
}
