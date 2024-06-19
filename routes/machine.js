// В роутах можно манипулировать мидделварами в любом порядке как мы хотим а так же это маршут где принимаются данные

const machineRouter = require('express').Router();
const {
  uploadPhoto
} = require('../multer/multer')

const {
  findAllMachine,
  createMachine
} = require('../middlewares/machine');

const {
  sendAllMachine,
  sendMachineCreated
} = require('../controllers/machine');

machineRouter.get('/machine', findAllMachine, sendAllMachine)
machineRouter.post('/machine', uploadPhoto.single('photo'), findAllMachine, createMachine, sendMachineCreated )

module.exports = machineRouter;