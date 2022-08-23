const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log("connected to MONGODB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = ConnectDB;
