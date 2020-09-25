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
  name: {
    type: String,
    default: "Anónimo",
  },
  count: {
    type: Number,
    default: 1,
  },
});

const VisitorModel = mongoose.model("Visitor", VisitorSchema);

async function createVisitor(name) {
  if (name) {
    await VisitorModel.findOne(
      {
        name,
      },
      async function (err, visitor) {
        if (err) {
          return console.error(err);
        }

        if (visitor) {
          visitor.count = visitor.count + 1;
          await visitor.save();
        } else {
          await VisitorModel.create({
            name,
          });
        }
      }
    );
  } else {
    await VisitorModel.create({});
  }

  return await getAllVisitors();
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
};
