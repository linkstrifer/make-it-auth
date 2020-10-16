const express = require("express");
const mustacheExpress = require("mustache-express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const model = require("./model");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    secret: "TEST",
    maxAge: 3600 * 1000,
  })
);

app.engine("html", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.get("/", async (req, res) => {
  const { userId } = req.session;
  const visitors = await model.getAllVisitors();

  res.render("table.html", { visitors, userId });
});

app.get("/register", (req, res) => {
  res.render("register.html", {});
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const user = { name, email, password };

  model.createVisitor(user, () => {
    res.redirect("/");
  });
});

app.get("/login", (req, res) => {
  res.render("login.html", {});
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  model.login({ email, password }, (logged) => {
    if (logged) {
      req.session.userId = logged;
      res.redirect("/");
    } else {
      res.render("login.html", { error: "User not found" });
    }
  });
});

app.get("/logout", (req, res) => {
  model.logout(req.session.userId, () => {
    req.session.userId = null;

    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
