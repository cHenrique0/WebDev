import { customAlphabet } from "nanoid";
import chalk from "chalk";
import path from "path";
import fs from "fs";
import inquirer from "inquirer";

export function createAccount() {
  console.log(chalk.green.italic("\nThank you for choosing us!"));
  console.log(chalk.green.italic("Enter your informations bellow\n"));

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

      const newAccount = {
        account: Number(account),
        name,
        age: Number(age),
        email,
        balance,
      };

      storeAccount(newAccount);
      console.log(
        chalk.bgCyan.black("\nYour account has been created successfully."),
        `\nSave the account number: ${chalk.green(newAccount.account)}`
      );
    });
}

export function checkBalance() {
  inquirer
    .prompt({
      name: "account",
      message: "Enter account number:",
    })
    .then((answer) => {
      const { account } = answer;
      const location = getStoragePath();
      fs.readFile(location, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        const accountJSON = JSON.parse(data);
        const accountMatchIndex = accountJSON.accounts
          .map((acc) => acc.account)
          .indexOf(Number(account));
        const accountMatch = accountJSON.accounts[accountMatchIndex];
        if (accountMatchIndex === -1) {
          console.log("This account doesn't exists");
          return;
        }
        console.log(`Your balance: R$ ${accountMatch.balance}`);
      });
    });
}

export function deposit(amount) {
  inquirer
    .prompt({
      name: "account",
      message: "Enter account number:",
    })
    .then((answer) => {
      const { account } = answer;
      const location = getStoragePath();
      fs.readFile(location, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        const accountJSON = JSON.parse(data);
        const accountMatchIndex = accountJSON.accounts
          .map((acc) => acc.account)
          .indexOf(Number(account));
        const accountMatch = accountJSON.accounts[accountMatchIndex];
        if (accountMatchIndex === -1) {
          console.log("This account doesn't exists");
          return;
        }
        inquirer
          .prompt({
            name: "amount",
            message: "Enter the amount you want to deposit:",
          })
          .then((answer) => {
            const { amount } = answer;
            accountMatch.balance += Number(amount);
            storeAccount(accountMatch);
            console.log(chalk.green("Deposit made successfully"));
          });
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
