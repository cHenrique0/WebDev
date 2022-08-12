const fs = require("fs");

fs.rename("./arquivo.txt", "./rename.txt", (error) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("Filename updated successfully!");
});
