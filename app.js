const express = require("express");
const app = express();

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send(`<form action="/" method="post">
    <input type="text" name="nombre" />
    <button type="submit">Enviar</button>
  </form>`);
});

app.post("/", function (req, res) {
  const { nombre } = req.body;

  res.send(`<h1>Hola ${capitalize(nombre)}!</h1>`);
});

app.get("/makers/:nombre", (req, res) => {
  const { nombre } = req.params;

  res.send(`<h1>Hola ${capitalize(nombre)}!</h1>`);
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
