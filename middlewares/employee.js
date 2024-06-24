// получая данные здесь мы редактируем их

const employee = require('../models/employee');

const findAllEmployee = async (req, res, next) => {
  req.employeeArray = await employee.find({}).populate("machine").populate("schedule");
  console.log(req.employeeArray)
  next();
}

const createEmployee = async (req, res, next) => {
  try {
    
    const employeeData = {
      name: req.body.name,
      job: req.body.job,
      machine: req.body.machine,
      schedule: req.body.schedule
    };
    if (req.file) {
      employeeData.photoPath = req.file.path;
    }

    req.employee = await employee.create(employeeData)
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