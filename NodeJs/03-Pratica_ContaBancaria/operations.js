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
        let accountJSON = JSON.parse(data);
        accountJSON.accounts.forEach((element) => {
          if (element.account === Number(account)) {
            console.log(`Your balance: ${element.balance}`);
            return;
          }
        });
        console.log("This account doesn't exists");
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
    let accountsJSON = JSON.parse(data);

    accountsJSON.accounts.push(account);

    accountsJSON = JSON.stringify(accountsJSON, null, 2);

    fs.writeFile(location, accountsJSON, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(
        chalk.bgCyan.black("\nYour account has been created successfully.")
      );
    });
  });
}

function getStoragePath() {
  return path.resolve("./storage/accounts.json");
}
