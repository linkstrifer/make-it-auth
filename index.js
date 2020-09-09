const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const { nombre } = req.query;
  let template = "Hola ";

  if (nombre) {
    template += nombre;
  } else {
    template += "desconocido";
  }

  template += "!";

  res.send(`<h1>${template}</h1>`);
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
