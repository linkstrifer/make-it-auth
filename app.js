const express = require("express");
const app = express();

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

app.get("/", (req, res) => {
  const { nombre } = req.query;
  let template = "Hola ";

  if (nombre) {
    template += capitalize(nombre);
  } else {
    template += "desconocido";
  }

  template += "!";

  res.send(`<h1>${template}</h1>`);
});

app.get("/makers/:nombre", (req, res) => {
  const { nombre } = req.params;
  let template = "Hola ";

  template += capitalize(nombre) + "!";

  res.send(`<h1>${template}</h1>`);
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
