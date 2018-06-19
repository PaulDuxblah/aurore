const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Admin = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: 'admins'
});

module.exports = mongoose.model('Admin', Admin);