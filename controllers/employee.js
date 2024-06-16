
const sendAllEmployee = (req, res) => {
  res.setHeader('Content-Type', 'aplication/json');
  res.end(JSON.stringify(req.employeeArray))
};

const sendEmployeeCreated = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(req.employee))
};

module.exports = {
  sendAllEmployee,
  sendEmployeeCreated
}