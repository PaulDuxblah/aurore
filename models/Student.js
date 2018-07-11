const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Student = new Schema({
  inscriptionDate: {
    type: Date,
    required: true
  },
  imageAuthorization: {
    type: Boolean,
    default: false
  },
  reduction: {
    type: Number,
    default: 0
  },
  person: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  },
  father: {
    type: Schema.Types.ObjectId,
    ref: 'Person'
  },
  mother: {
    type: Schema.Types.ObjectId,
    ref: 'Person'
  },
  legalReponsible: {
    type: Schema.Types.ObjectId,
    ref: 'Person'
  },
  personToWarn: {
    type: Schema.Types.ObjectId,
    ref: 'Person'
  }
}, {
  collection: 'students'
});

module.exports = mongoose.model('Student', Student);