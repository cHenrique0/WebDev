const EventEmmiter = require("events");
const eventEmmiter = new EventEmmiter();

// o parametro "start" é o identificador do envento e pode receber qualquer nome
eventEmmiter.on("start", () => {
  console.log("Durante o evento");
});

console.log("Antes do evento");

eventEmmiter.emit("start"); // gatilho do evento

console.log("Depois do evento");
