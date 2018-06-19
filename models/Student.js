const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Student = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    collection: 'students'
});

module.exports = mongoose.model('Student', Student);