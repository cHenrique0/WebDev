const fs = require("fs");

fs.unlink("arquivo.txt", (error) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("File deleted successfully!");
});
