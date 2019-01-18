require('./config/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Routes
app.use(require('./routes/index'));

//Mongo
const opts = { useNewUrlParser: true, useCreateIndex: true };

mongoose.connect(process.env.URI, opts).then(() => {
    console.log(`Conectado a mongo, uri : ${process.env.URI}`);
}).catch((err) => {
    throw err;
});

app.listen(process.env.PORT, (err => {
    if (err) throw err;
    console.log(`Recibiendo peticiones del puerto : ${process.env.PORT}`);
}));