const employeeRoute = require("express").Router();
const {
  upload,
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
employeeRoute.post("/employee", uploadPhoto.single('Photo'), findAllEmployee, createEmployee, sendEmployeeCreated) 

module.exports = employeeRoute;