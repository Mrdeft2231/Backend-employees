// Модели позволяют нам создать скелет для принятия данных

const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
  machine: {
    type: String,
    require: true
  },
  photoPath: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('machine', machineSchema);