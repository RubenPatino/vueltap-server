const userSchema = require('../models/user')
const express = require('express');
const app = express();

app.get('/', (req, res) => {

});

app.get('/user', (req, res) => {

    res.json({
        status: true,
        message: 'Bienvenido'
    });

});

app.post('/user/add', (req, res) => {
    let body = req.body;

    let user = new userSchema({
        email: body.email,
        name: body.name,
        last_name: body.lastName,
        phone: body.phone,
        role: body.role,
        img: body.img,
        state: body.state,
        password: body.password
    });

    user.save((err, data) => {
        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        }
        res.json({
            status: true,
            message: "Felicitaciones has finalizado tu proceso de registro exitosamente.  Procederemos con un chequeo de seguridad de toda la información suministrada. Si eres seleccionado te llegará un mensaje de texto invitándote a una capacitación. Este proceso tardará una semana aproximadamente."
        });
    });

});


module.exports = app;