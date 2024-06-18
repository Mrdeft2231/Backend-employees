const machine = require('../models/machine');

const findAllMachine = async (req, res, next) => {
  console.log('Все станки', req.body)
  req.machineArray = await machine.find({})
  next();
}

const createMachine = async (req, res, next) => {
  console.log("POST /machine");
  console.log(req.file)
  try {
    const employeeData = {
      machine: req.body.machine
    };


    if (req.file) {
      employeeData.photoPath = req.file.path;
    }
    console.log('Путь до файла', employeeData)

    req.machine = await machine.create(employeeData)
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка при создании Станка" }));
  }
}

const findMachineById = async (req, res, next) => {
  try {
    req.machine = await machine.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Сотрудник не найден" }))
  }
}

module.exports = {
  findAllMachine,
  createMachine,
  // findEmployeeById
}