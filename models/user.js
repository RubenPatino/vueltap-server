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
    last_name: {
        type: String
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        default: 'USER',
        enum: roles
    },
    img: {
        type: String,
        url: String
    },
    state: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: [true, 'Por favor, digite una clave.']
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