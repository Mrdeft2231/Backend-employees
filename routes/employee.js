// В роутах можно манипулировать мидделварами в любом порядке как мы хотим а так же это маршут где принимаются данные

const employeeRoute = require("express").Router();
const {
  uploadPhoto
} = require('../multer/multer')

const {
  findAllEmployee,
  createEmployee,
  findEmployeeById
} = require('../middlewares/employee')

const {
  sendAllEmployee,
  sendEmployeeCreated
} = require('../controllers/employee')

employeeRoute.get("/employee", findAllEmployee, sendAllEmployee)
employeeRoute.post("/employee", uploadPhoto.single('photo'), findAllEmployee, createEmployee, sendEmployeeCreated) 

module.exports = employeeRoute;