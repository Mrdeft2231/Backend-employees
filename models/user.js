// Модели позволяют нам создать скелет для принятия данных

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('authorization', userSchema);