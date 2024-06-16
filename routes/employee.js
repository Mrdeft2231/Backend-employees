const employeeRoute = require("express").Router();
const upload = require('../multer/multer')

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
employeeRoute.post("/employee", upload.any, findAllEmployee, createEmployee, sendEmployeeCreated) 

module.exports = employeeRoute;