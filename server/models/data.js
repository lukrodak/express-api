const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const validator = require('validator');


const DataSchema = new Schema({
    partNumber: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isAlphanumeric(value);
            },
            message: '{VALUE} is not alphanumeric'
        }
    },
    totalChecked: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 5
    },
    reworked: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 5
    },
    nok: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 5
    },
    remarks: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        validate: {
            validator: (value) => {
                return validator.isAlphanumeric(value);
            },
            message: '{VALUE} is not alphanumeric'
        }
    }
});

const Data = mongoose.model('Data', DataSchema);

module.exports = {
    Data
};