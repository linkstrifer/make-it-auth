const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", function (err) {
  if (err) {
    return console.error(err);
  }
});

const VisitorSchema = mongoose.Schema({
  date: Date,
  name: String,
});

const VisitorModel = mongoose.model("Visitor", VisitorSchema);

app.get("/", (req, res) => {
  const { name } = req.query;

  VisitorModel.create({
    date: new Date(),
    name: name ? name : "Anónimo",
  });

  res.send("<h1>El visitante fue almacenado con éxito</h1>");
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
