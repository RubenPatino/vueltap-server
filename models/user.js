const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let roles = {
    values: ['ADMIN', 'USER', 'MESSENGER'],
    message: '{VALUE} no es un rol valido.'
};

let userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Por favor, digite un correo electrónico.'],
        validate: [validator.isEmail, 'La dirección de correo electrónico no es válida...']
    },
    name: {
        type: String,
        required: [true, 'Por favor, digite su nombre.']
    },
    lastName: {
        type: String,
        required: [true, 'Por favor, digite su apellido.']
    },
    address: {
        type: String,
        required: [true, 'Por favor, digite su dirección.']
    },
    urlAddress: {
        type: String,
        required: [true, 'Por favor, digite su dirección.']
    },
    phone: {
        type: String,
        required: [true, 'Por favor, digite su número telefónico.']
    },
    dniNumber: {
        type: String,
        required: [true, 'Por favor, digite su número de identificación.']
    },
    urlDniFront: {
        type: String,
        required: [true, 'Por favor, se requiere url de su identificación.']
    },
    urlDniBack: {
        type: String,
        required: [true, 'Por favor, se requiere url de su identificación.']
    },
    checkPhone: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'MESSENGER',
        enum: roles
    },

    img: {
        type: String,
        url: String
    },
    typeTransport: {
        type: Number,
        default: 1
    },
    urlLicence: {
        type: String
    },
    urlProperty: {
        type: String
    },
    urlSoat: {
        type: String
    },
    urlTecno: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    },
    checkIn: {
        type: String,
        default: "validateInformation"
            //state= 1: validateInformation, 2 :validateFalse 3: validateTraining(capa), 4: validateTrue
    }
});

// se genera un nuevo objecto que no muestre el password.
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
}

//se verifica que el correo no este registrado.
userSchema.plugin(uniqueValidator, { message: 'El correo electronico ya esta registrado.' });

module.exports = mongoose.model('User', userSchema);