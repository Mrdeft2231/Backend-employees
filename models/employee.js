const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('employee', employeeSchema);