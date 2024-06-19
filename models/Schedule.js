// Модели позволяют нам создать скелет для принятия данных

const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  dateMonth: {
    type: String,
    required: true
  },
  dateMode: {
    type: String,
    required: true
  },
  dateSchedule: {
  type: String,
  required: true
  },
  dateTime: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('schedule', scheduleSchema);