require('./config/config');

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();

//

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Routes
app.use(require('./routes/index'));

//Mongo
require('./db/connect')

//public
app.use(express.static(path.resolve(__dirname, './public')));


app.listen(process.env.PORT, (err => {
    if (err) throw err;
    console.log(`Recibiendo peticiones del puerto : ${process.env.PORT}`);
}));