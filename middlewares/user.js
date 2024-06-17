
const users = require('../models/user')

const findAllUsers = async (req, res, next) => {
  req.usersArray = await users.find({})
  next();
}

const createUser = async (req, res, next) => {
  console.log("POST /user");
  try {
    console.log(req.body);
    req.users = await users.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка при создании Пользователя" }));
  }
}

const findGameById = async (req, res, next) => {
  console.log("Проработал метод GET /api/users/:id");
  try {
    req.users = await users.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
  }
}

module.exports = {
  findAllUsers,
  createUser,
  // findGameById
}