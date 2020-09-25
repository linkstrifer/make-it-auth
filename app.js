const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const model = require("./model");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("html", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.get("/", async (req, res) => {
  const visitors = await model.getAllVisitors();

  res.render("table.html", { visitors });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const user = { name, email, password };

  model.createVisitor(user, () => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
