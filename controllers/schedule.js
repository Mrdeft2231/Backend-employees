// Здесь мы отправляем ответ пользователю взамен на запрос

const sendAllSchedule = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(req.scheduleArray))
};

const sendScheduleCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.schedule))
}

module.exports = {
  sendAllSchedule,
  sendScheduleCreated
};