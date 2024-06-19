// Здесь мы отправляем ответ пользователю взамен на запрос

const sendAllUsers = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(req.usersArray))
};

const sendUserCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.users))
}

module.exports = {
  sendAllUsers,
  sendUserCreated
};