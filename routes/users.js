const userSchema = require('../models/user')
const express = require('express');
const app = express();
const User = require('../models/user');

app.get('/', (req, res) => {

});

app.get('/user/check/:email', (req, res) => {
    let email = req.params.email;

    User.findOne({ email: new RegExp('^' + email + '$', 'i') }, (err, dataDB) => {
        if (err) {
            return res.status(500).json({
                status: false,
                messages: err
            });
        };
        if (dataDB === null) {
            return res.json({
                status: false,
                message: 'No se encotraron datos.'
            });
        }
        res.json({
            status: true,
            user: dataDB
        });
    });

    // res.json([{
    //     status: true,
    //     message: "Felicitaciones has finalizado tu proceso de registro exitosamente.  Procederemos con un chequeo de seguridad de toda la información suministrada. Si eres seleccionado te llegará un mensaje de texto invitándote a una capacitación. Este proceso tardará una semana aproximadamente.",
    //     email
    // }]);

});

app.post('/user/add', (req, res) => {
    let body = req.body;

    let user = new userSchema({
        email: body.email,
        name: body.name,
        last_name: body.lastName,
        phone: body.phone,
        img: body.img
    });

    user.save((err, data) => {
        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        };
        res.json({
            status: true,
            message: "Felicitaciones has finalizado tu proceso de registro exitosamente.  Procederemos con un chequeo de seguridad de toda la información suministrada. Si eres seleccionado te llegará un mensaje de texto invitándote a una capacitación. Este proceso tardará una semana aproximadamente."
        });
    });

});


module.exports = app;