const mongoose = require('mongoose');
const validator = require('validator');
let Schema = mongoose.Schema;

let roles = {
    values: ['ADMIN', 'USER', 'MESSENGER'],
    message: '{VALUE} no es un rol valido.'
};

let userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: validator.isEmail
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
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
        required: true
    }
});

module.exports = userSchema;