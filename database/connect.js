const mongoose = require("mongoose");
const { createModel } = require('mongoose-gridfs');

const DB_URL = "mongodb://localhost:27017/admin";

async function connectToDatabase() {
try {
  await mongoose.connect(DB_URL)
  const Attachment = createModel({
    modelName: 'Attachment',
    connection: connection
  });

  mongoose.Attachment = Attachment;
  console.log("Успешное подключение к базе");
} catch (err) {
  console.log("Не удалось подключиться к базе");
  console.log(err);
}

}



module.exports = connectToDatabase;