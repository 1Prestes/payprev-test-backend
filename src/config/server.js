const mongoose = require('mongoose');
const config = require('./config');

const url = config.bd_string;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true, useCreateIndex: true }
mongoose.set('useFindAndModify', false);

mongoose.connect(url, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('Connection established with the database');
});

