const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Address = new Schema({
    road: {
        type: String,
        required: true
    },
    complement: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    }
}, {
    collection: 'addresses'
});

module.exports = mongoose.model('Address', Address);