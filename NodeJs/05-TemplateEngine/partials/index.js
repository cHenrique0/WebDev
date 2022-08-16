const express = require("express");
const { engine, create } = require("express-handlebars");

const app = express();
const port = 3000;

// setup partials
const partialsConfig = create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/products", (request, response) => {
  // mock list
  const products = [
    {
      name: "Playstation 5",
      price: "R$ 4499.99",
      category: "Games",
      description:
        "Jogar não tem Limites. Desfrute do carregamento extremamente rápido com o SSD de altíssima velocidade, uma imersão mais profunda com suporte a feedback tátil, gatilhos adaptáveis e áudio 3D, além de uma geração inédita de jogos incríveis para Console PlayStation®5 - PS5.",
    },
    {
      name: "Xbox Series X",
      price: "R$ 4499.99",
      category: "Games",
      description:
        "O Xbox Series X é um dos dois sucessores dos consoles de nova geração da Microsoft, que traz consigo um poder de processamento avantajado unido à uma biblioteca de jogos retrocompatíveis que quebra paradigmas. Dentre suas inúmeras inovações, a principal dela é o carregamento através de SSDs (Solid State Drives), que permite minimizar o tempo de carregamento de todos os processos dentro do console, eliminando para sempre telas de loading e horas de instalação.",
    },
  ];

  return response.status(200).render("products", { products });
});

app.get("/", (request, response) => {
  return response.status(200).render("home");
});

app.listen(port, () => {
  console.log(`Application is runnig at port: ${port}`);
});
