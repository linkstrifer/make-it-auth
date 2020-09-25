const mongoose = require("mongoose");

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
  name: String,
  email: String,
  password: String,
});

const VisitorModel = mongoose.model("Visitor", VisitorSchema);

async function createVisitor(user, callback) {
  VisitorModel.create(user, function (err) {
    if (err) {
      return console.error(err);
    }

    callback();
  });
}

async function getAllVisitors() {
  return await VisitorModel.find({}, function (err, visitors) {
    if (err) {
      return console.error(err);
    }

    return visitors;
  });
}

module.exports = {
  createVisitor,
  getAllVisitors,
};
