// Lendo entradas do usuario usando um módulo externo

import inquirer from "inquirer";

inquirer
  .prompt([
    {
      name: "p1",
      message: "Qual a 1ª nota?",
    },
    {
      name: "p2",
      message: "Qual a 2ª nota?",
    },
  ])
  .then((answers) => {
    console.log("Notas:", answers);
    const average = (parseFloat(answers.p1) + parseFloat(answers.p2)) / 2;
    console.log(`A média é: ${average}`);
  })
  .catch((error) => console.log(error));
