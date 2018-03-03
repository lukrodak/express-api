const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const validator = require('validator');


const DataSchema = new Schema({
    partNumber: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10,
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
    fromThisOk: {
        type: Number,
        trim: true,
        required: true
    },

    nok: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 5
    },
    totalOk: {
        type: Number,
        required: true,
        trim: true
    },
    remarks: {
        type: String,
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