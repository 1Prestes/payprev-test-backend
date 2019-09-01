const express = require('express');
const bodyParser = require('body-parser');
const server = require('./config/server');
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;
const routes = require('./Routes/Routes');

app.use(cors());
app.use('/', routes);

app.listen(port);

module.exports = app;