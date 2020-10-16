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
  logged: {
    type: Boolean,
    default: false,
  },
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
  return await VisitorModel.find({ logged: true }, function (err, visitors) {
    if (err) {
      return console.error(err);
    }

    return visitors;
  });
}

function login({ email, password }, callback) {
  VisitorModel.findOne({ email }).exec(function (error, visitor) {
    if (error) {
      console.error(error);
      return callback(false);
    }

    if (visitor && visitor.password === password) {
      visitor.logged = true;

      visitor.save((error) => {
        if (error) {
          console.error(error);
          return callback(false);
        }

        return callback(visitor.id);
      });
    } else {
      return callback(false);
    }
  });
}

function logout(id, callback) {
  VisitorModel.findById(id).exec(function (error, visitor) {
    if (error) {
      console.error(error);
    }

    if (visitor) {
      visitor.logged = false;

      visitor.save((error) => {
        if (error) {
          console.error(error);
        }

        callback();
      });
    }
  });
}

module.exports = {
  createVisitor,
  getAllVisitors,
  login,
  logout,
};
