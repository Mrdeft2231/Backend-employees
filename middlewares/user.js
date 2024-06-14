
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
    res.status(400).send(JSON.stringify({ message: "Ошибка при создании игры" }));
  }
}


module.exports = {
  findAllUsers,
  createUser
}