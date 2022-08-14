import { customAlphabet } from "nanoid";
import chalk from "chalk";
import path from "path";
import fs from "fs";
import inquirer from "inquirer";
import { systemInit } from "./system.js";

export function createAccount() {
  console.log(chalk.bgCyan.black(`      Create account      `));
  console.log(chalk.green.italic("\nThank you for choosing us!"));
  console.log(chalk.green.italic("Enter your informations below\n"));

  const id = customAlphabet("123456789", 5);

  inquirer
    .prompt(
      [
        {
          name: "name",
          message: "[1] - What is your name:",
        },
        {
          name: "email",
          message: "[2] - Type your e-mail:",
        },
        {
          name: "age",
          message: "[3] - How old are you:",
        },
      ],
      {
        account: id(),
        balance: 0,
      }
    )
    .then((answers) => {
      const { account, name, age, email, balance } = answers;

      if (checkAccountExists(name)) {
        console.log(
          chalk.red.italic(
            "\nYou already have an account at THE BANK.\nPlease, try remember your account number."
          )
        );
        return setTimeout(() => {
          console.clear();
          systemInit();
        }, 2000);
      }
      if (checkEmailExists(email)) {
        console.log(
          chalk.red.italic(
            "\nThis email already exists.\nPlease choose another.\n"
          )
        );
        return setTimeout(() => {
          console.clear();
          createAccount();
        }, 2000);
      }

      const newAccount = {
        account: Number(account),
        name,
        age: Number(age),
        email,
        balance,
      };

      storeAccount(newAccount);

      console.log(
        chalk.bgCyan.black("\nYour account has been created successfully.")
      );
      console.log(
        `Welcome to THE BANK, ${chalk.cyan(
          newAccount.name
        )}.\nPlease, follow the instructions below:`
      );
      console.log(
        `${chalk.green("*")} Save the account number: ${chalk.green(
          newAccount.account
        )}`
      );
      console.log(
        `${chalk.green(
          "*"
        )} With this number you can make transactions with your account`
      );
      console.log(
        `${chalk.green(
          "*"
        )} This number is non-transferable. Please, be careful and come back soon!\n`
      );
      return systemInit();
    });
}

export function checkBalance() {
  console.log(chalk.bgCyan.black(`      Balance      \n`));

  inquirer
    .prompt({
      name: "account",
      message: "Enter account number:",
    })
    .then((answer) => {
      const { account } = answer;
      const accountData = findAccount(account);
      if (!accountData) {
        console.log(
          chalk.red.italic(
            "\nSorry. This account doesn't exists\nEnter a valid account number.\n"
          )
        );

        return setTimeout(() => {
          console.clear();
          checkBalance();
        }, 1500);
      }

      console.log(`\nWelcome back, ${chalk.cyan(accountData.name)}`);
      console.log(
        `Your balance is: ${chalk.green("R$ " + accountData.balance)}\n`
      );

      return systemInit();
    });
}

export function deposit() {
  console.log(chalk.bgGreen.black(`      Deposit      \n`));

  inquirer
    .prompt({
      name: "account",
      message: "Enter account number:",
    })
    .then((answer) => {
      const { account } = answer;
      const accountData = findAccount(account);
      if (!accountData) {
        console.log(
          chalk.red.italic(
            "\nSorry. This account doesn't exists\nEnter a valid account number.\n"
          )
        );

        return setTimeout(() => {
          console.clear();
          deposit();
        }, 1500);
      }

      inquirer
        .prompt({
          name: "amount",
          message: "Enter the amount you want to deposit:",
        })
        .then((answer) => {
          const { amount } = answer;
          accountData.balance += Number(amount);
          storeAccount(accountData);
          console.log(chalk.green("\nDeposit made successfully\n"));
          return systemInit();
        });
    });
}

export function withdraw() {
  console.log(chalk.bgRed.black(`      Withdraw      \n`));

  inquirer
    .prompt({
      name: "account",
      message: "Enter account number:",
    })
    .then((answer) => {
      const { account } = answer;
      const accountData = findAccount(account);
      if (!accountData) {
        console.log(
          chalk.red.italic(
            "\nSorry. This account doesn't exists\nEnter a valid account number.\n"
          )
        );

        return setTimeout(() => {
          console.clear();
          withdraw();
        }, 1500);
      }

      inquirer
        .prompt({
          name: "amount",
          message: "Enter the amount you want to withdraw:",
        })
        .then((answer) => {
          const { amount } = answer;
          if (Number(amount) > accountData.balance) {
            console.log(
              chalk.red.italic(
                `\nDear ${accountData.name},\nYou don't have available balance for this transaction.\n`,
                `Please, check your balance and try again.\n`
              )
            );
            return setTimeout(() => {
              console.clear();
              systemInit();
            }, 3000);
          }
          accountData.balance -= Number(amount);
          storeAccount(accountData);
          console.log(chalk.green("Withdrawal successful\n"));
          return systemInit();
        });
    });
}

function createStorage() {
  const folderExists = fs.existsSync(path.resolve("./storage"));
  const jsonExists = fs.existsSync(path.resolve("./storage/accounts.json"));
  const accountsJSON = JSON.stringify({ accounts: [] }, null, 2);
  if (!folderExists) {
    fs.mkdirSync("./storage");
    if (!jsonExists) {
      fs.writeFileSync("./storage/accounts.json", accountsJSON, (err, file) => {
        if (err) {
          console.log(err);
        }
      });
    }
    return path.resolve("./storage/accounts.json");
  }
  if (!jsonExists) {
    fs.writeFileSync("./storage/accounts.json", accountsJSON, (err, file) => {
      if (err) {
        console.log(err);
      }
    });
  }
  return path.resolve("./storage/accounts.json");
}

function storeAccount(account) {
  const location = createStorage();

  fs.readFile(location, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let accountsJSON = JSON.parse(data);
    const accountMatchIndex = accountsJSON.accounts
      .map((acc) => acc.account)
      .indexOf(account.account);
    if (accountMatchIndex !== -1) {
      accountsJSON.accounts.splice(accountMatchIndex, 1, account);
    }
    if (accountMatchIndex === -1) {
      accountsJSON.accounts.push(account);
    }

    accountsJSON = JSON.stringify(accountsJSON, null, 2);

    fs.writeFile(location, accountsJSON, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });
}

function getStoragePath() {
  return path.resolve("./storage/accounts.json");
}

function findAccount(account) {
  const location = getStoragePath();
  const accountJSON = JSON.parse(
    fs.readFileSync(location, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
    })
  );

  const accountIndex = accountJSON.accounts
    .map((acc) => acc.account)
    .indexOf(Number(account));
  if (accountIndex === -1) {
    return;
  }
  const accountData = accountJSON.accounts[accountIndex];

  return accountData;
}

function checkAccountExists(name) {
  const location = getStoragePath();
  const accountJSON = JSON.parse(
    fs.readFileSync(location, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
    })
  );

  const accountIndex = accountJSON.accounts
    .map((acc) => acc.name)
    .indexOf(name);
  if (accountIndex === -1) {
    return;
  }
  const accountData = accountJSON.accounts[accountIndex];
  return accountData;
}

function checkEmailExists(email) {
  const location = getStoragePath();
  const accountJSON = JSON.parse(
    fs.readFileSync(location, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
    })
  );

  const accountIndex = accountJSON.accounts
    .map((acc) => acc.email)
    .indexOf(email);
  if (accountIndex === -1) {
    return;
  }
  const accountData = accountJSON.accounts[accountIndex];
  return accountData;
}
