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
      }
    )
    .then((answers) => {
      const { account, name, age, email } = answers;

      const newAccount = {
        account: Number(account),
        name,
        age: Number(age),
        email,
      };

      storeAccount(newAccount);
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
