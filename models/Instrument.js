const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Instrument = new Schema({
    name: {
        type: String,
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }
}, {
    collection: 'instruments'
});

module.exports = mongoose.model('Instrument', Instrument);