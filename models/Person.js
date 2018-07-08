const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Person = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  phone2: {
    type: String
  },
  phone3: {
    type: String
  },
  role: {
    type: String
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School'
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  }
}, {
  collection: 'persons'
});

module.exports = mongoose.model('Person', Person);