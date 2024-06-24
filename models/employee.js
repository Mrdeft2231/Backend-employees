// Модели позволяют нам создать скелет для принятия данных

const mongoose = require('mongoose');

const machineModel = require('./machine');
const scheduleModel = require('./Schedule');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  photoPath: {
    type: String,
    require: true
  },
  machine: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: machineModel,
  }],
  schedule: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: scheduleModel,
  }],
});

module.exports = mongoose.model('employees', employeeSchema);