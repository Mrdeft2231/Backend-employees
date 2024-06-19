// получая данные здесь мы редактируем их

const schedule = require('../models/Schedule');

const findAllSchedule = async (req, res, next) => {
  req.scheduleArray = await schedule.find({})
  next();
}

const createSchedule = async (req, res, next) => {
  try {
    req.schedule = await schedule.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка при создании Графика" }));
  }
}

module.exports = {
  findAllSchedule,
  createSchedule
}