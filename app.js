const express = require("express");
const app = express();

app.get("/", function (req, res) {
  const userAgent = req.headers["user-agent"];

  res.send(userAgent);
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
