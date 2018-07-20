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

// CHECK IF CALLER IS AUTHORIZED
personRoutes.route('*').all(checkIfAuthenticated, function (req, res, next) {
  next();
});

//POST
personRoutes.route('/').post(function (req, res) {
  let missingFields = getMissingFields(req.body);
  if (missingFields.length > 0) {
    res.status(400).send('Not all required fields are present: ' + missingFields.join(', '));
    return;
  }

  const address = new Address(req.body.address);

  address.save()
    .then(address => {  
      const person = new Person(req.body);
      person.address = address._id;

      person.save()
        .then(person => {
          console.log('Person added!');
          res.json(person);
        })
        .catch(err => {
          console.log(err);
          switch (err.code) {
            default:
              res.status(400).send("Unable to save person to database");
              break;
          }
        });
    })
    .catch(err => {
      console.log(err);
      switch (err.code) {
        default:
          res.status(400).send("Unable to save address to database");
          break;
      }
    });
});

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