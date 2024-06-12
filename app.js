const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const connectToDatabase = require("./database/connect");
const pagesRouter = require("./routes/page.js")


const PORT = 3000;

const app = express();
connectToDatabase();

app.use(
  pagesRouter,
  express.static(path.join(__dirname, 'public'))
);

app.listen(PORT);