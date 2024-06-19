const express = require('express');
const path = require('path');
const apiRouter = require('./routes/apiRouter')


const connectToDatabase = require("./database/connect");

const PORT = 3000;

const app = express();
connectToDatabase();

app.use(
  apiRouter,
  express.static(path.join(__dirname, 'public')),
);

app.use('/uploadsPhoto', express.static('uploadsPhoto'));

app.listen(PORT);