// Здесь мы отправляем ответ пользователю взамен на запрос

const sendAllMachine = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(req.machineArray))
};

const sendMachineCreated = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(req.machine))
}

module.exports = {
  sendAllMachine,
  sendMachineCreated
}