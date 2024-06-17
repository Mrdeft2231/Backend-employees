const employee = require('../models/employee');

const findAllEmployee = async (req, res, next) => {
  console.log(req.body)
  req.employeeArray = await employee.find({})
  next();
}

const createEmployee = async (req, res, next) => {
  console.log("POST /employee");
  try {
    console.log(req.body);
    req.employee = await employee.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка при создании сотрудника" }));
  }
}

const findEmployeeById = async (req, res, next) => {
  try {
    req.employee = await employee.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Сотрудник не найден" }))
  }
}

module.exports = {
  findAllEmployee,
  createEmployee,
  // findEmployeeById
}