const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let vehicleSchema = new Schema({
    type: Number,
    placa: {
        type: String,
        unique: true,
        required: true
    },
    urlLicence: {
        type: String,
        required: true
    },

});