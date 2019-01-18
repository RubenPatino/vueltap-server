const user = require('../models/user')
const express = require('express');
const app = express();

app.get('/user', (req, res) => {

    res.json({
        status: true,
        data: 'Bienvenido'
    });

});

app.post('/user/add', (res, req) => {

});

module.exports = app;