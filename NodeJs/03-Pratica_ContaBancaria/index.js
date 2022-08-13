import inquirer from "inquirer";
import chalk from "chalk";
import { checkBalance, createAccount } from "./operations.js";

// System operation
function systemInit() {
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
          "To withdraw",
          "Exit",
        ],
      },
    ])
    .then((choice) => {
      const { action } = choice;
      const title =
        action === "Exit"
          ? chalk.bgRed.black(`      ${action}      `)
          : chalk.bgGreen.black(`      ${action}      `);
      console.clear();
      console.log(title);
      if (action === "Create an Account") {
        createAccount();
      }
      if (action === "Balance") {
        checkBalance();
      }
    })
    .catch((err) => console.log(err));
}

console.clear();
console.log(chalk.bgCyanBright.black("     Welcome to THE BANK     "));
systemInit();
