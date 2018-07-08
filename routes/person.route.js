const express = require('express');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
const personRoutes = express.Router();
const jwt = require('jsonwebtoken');
const fs = require("fs");
const RSA_PUBLIC_KEY = fs.readFileSync('jwtRS256.key.pub');
const config = require('../config/DB');
const salt = config.salt;
const bcrypt = require('bcrypt');

let Address = require('../models/Address');
let Person = require('../models/Person');

personRoutes.use(bodyParser.urlencoded({extended: true}));
personRoutes.use(bodyParser.json());

const checkIfAuthenticated = expressJwt({
  secret: RSA_PUBLIC_KEY
});

function getMissingFields(values) {
  const requiredFields = ['address', 'firstName', 'lastName'];
  let missingFields = [];

  requiredFields.forEach(function(field) {
    if (!values[field]) {
      missingFields.push(field);
    }
  });

  return missingFields;
}

// GET ALL
personRoutes.route('/').get(function (req, res) {
  Person.find(function (err, persons){
    if(err){
      console.log('err');
      console.log(err);
    } else {
      console.log('success');
      res.json(persons);
    }
  });
});

module.exports = personRoutes;