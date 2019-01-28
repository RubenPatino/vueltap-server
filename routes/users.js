const fs = require('fs');
const userSchema = require('../models/user');
const fileUpload = require('express-fileupload');
const express = require('express');
const path = require('path');
const app = express();
const User = require('../models/user');

// default options
app.use(fileUpload());


app.post('/user/upload/dni/front', (req, res) => {
    if (!req.body.email) {
        return res.json({
            status: false,
            message: 'Email required'
        });
    }
    if (!req.files) {
        return res.status(400).json({
            status: false,
            message: 'No se ha cargado ningun archivo'
        });
    }

    let email = req.body.email;
    let image = req.files.image;

    let archivoCortado = image.name.split('.');
    let extension = archivoCortado[archivoCortado.length - 1];
    let extensionesPermitidas = ['jpg', 'png', 'gif', 'jpeg'];

    if (extensionesPermitidas.indexOf(extension) < 0) {
        return res.status(400).json({
            status: false,
            message: 'Extensiones permitidas.' + extensionesPermitidas.join(',')
        });
    };

    let dir = path.resolve(__dirname, `../upload/${email}`);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    };
    let dirPach = `${dir}/dni_front.${extension}`;

    image.mv(dirPach, (err) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }
        res.json({
            status: true,
            message: dirPach
        });
    });
});
app.post('/user/upload/dni/back', (req, res) => {
    if (!req.body.email) {
        return res.json({
            status: false,
            message: 'Email required'
        });
    }
    if (!req.files) {
        return res.status(400).json({
            status: false,
            message: 'No se ha cargado ningun archivo'
        });
    }

    let email = req.body.email;
    let image = req.files.image;

    let archivoCortado = image.name.split('.');
    let extension = archivoCortado[archivoCortado.length - 1];
    let extensionesPermitidas = ['jpg', 'png', 'gif', 'jpeg'];

    if (extensionesPermitidas.indexOf(extension) < 0) {
        return res.status(400).json({
            status: false,
            message: 'Extensiones permitidas.' + extensionesPermitidas.join(',')
        });
    };

    let dir = path.resolve(__dirname, `../upload/${email}`);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    };
    let dirPach = `${dir}/dni_back.${extension}`;

    image.mv(dirPach, (err) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }
        res.json({
            status: true,
            message: dirPach
        });
    });
});
app.post('/user/upload/domicile', (req, res) => {
    if (!req.body.email) {
        return res.json({
            status: false,
            message: 'Email required'
        });
    }
    if (!req.files) {
        return res.status(400).json({
            status: false,
            message: 'No se ha cargado ningun archivo'
        });
    }

    let email = req.body.email;
    let image = req.files.image;

    let archivoCortado = image.name.split('.');
    let extension = archivoCortado[archivoCortado.length - 1];
    let extensionesPermitidas = ['jpg', 'png', 'gif', 'jpeg'];

    if (extensionesPermitidas.indexOf(extension) < 0) {
        return res.status(400).json({
            status: false,
            message: 'Extensiones permitidas.' + extensionesPermitidas.join(',')
        });
    };

    let dir = path.resolve(__dirname, `../upload/${email}`);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    };
    let dirPach = `${dir}/domicile.${extension}`;

    image.mv(dirPach, (err) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }
        res.json({
            status: true,
            message: dirPach
        });
    });
});
app.post('/user/upload/domicilio/:email', (req, res) => {
    if (!req.params.email) {
        return res.json({
            status: false,
            message: 'Email required'
        });
    }
    if (!req.files) {
        return res.status(400).json({
            status: false,
            message: 'No se ha cargado ningun archivo'
        });
    }

    let email = req.params.email;
    let image = req.files.image;

    let archivoCortado = image.name.split('.');
    let extension = archivoCortado[archivoCortado.length - 1];
    let extensionesPermitidas = ['jpg', 'png', 'gif', 'jpeg'];

    if (extensionesPermitidas.indexOf(extension) < 0) {
        return res.status(400).json({
            status: false,
            message: 'Extensiones permitidas.' + extensionesPermitidas.join(',')
        });
    };
    let dir = path.resolve(__dirname, `../upload/${email}`);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    };

    image.mv(`${dir}/domicilio.jpg`, function(err) {
        if (err)
            return res.status(500).send(err);

        res.json({
            status: true,
            message: dir
        });
    });
});


app.get('/user/check/:email', (req, res) => {
    let email = req.params.email;

    User.findOne({ email: new RegExp('^' + email + '$', 'i') }, (err, dataDB) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
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
});

app.post('/user/add', (req, res) => {
    let body = req.body;

    let user = new userSchema({
        email: body.email,
        name: body.name,
        lastName: body.lastName,
        address: body.address,
        phone: body.phone,
        identificationNumber: body.identificationNumber
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