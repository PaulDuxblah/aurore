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
  console.log('GETALL')
  Person.find()
    .populate('address')
    .exec(function (err, persons){
      if(err){
        console.log('err');
        console.log(err);
      } else {
        console.log('success');
        res.json(persons);
      }
    });
});

// GET
personRoutes.route('/:id').get(function (req, res) {
  console.log('GET')
  Person.findOne({ _id: req.params.id })
    .populate('address')
    .exec(function (err, person) {
      if(err){
        console.log('err');
        console.log(err);
        return;
      }

      if (person === null) {
        res.status(400).json('Unknown person');
        return;
      }

      console.log('success');
      res.json(person);
    });
});

// PUT
personRoutes.route('/:id').put(function (req, res) {
  console.log('PUT')
  let missingFields = getMissingFields(req.body);
  if (missingFields.length > 0) {
    console.log('missingFields');
    res.status(400).send('Not all required fields are present: ' + missingFields.join(', '));
    return;
  }
  console.log('p1')

  Person.findOne({_id: req.params.id})
    .populate('address')
    .exec(function (err, person) {
      if (err) {
        console.log(err);
        console.log('err');
        return;
      }
      console.log('p2')

      if (person === null) {
        res.status(400).json('Unknown person');
        return;
      }
      console.log('p3')
      console.log(req.body.address)
      for (var key in req.body.address) {
        person.address[key] = req.body.address[key];
      }
      console.log('p4')
      person.address.save() 
        .then(address => {
          for (var key in req.body) {
            if (key === 'address') continue;
            person[key] = req.body[key];
          }
          console.log('p5')

          person.save()
            .then(person => {
              console.log('p6')
              console.log('success');
              res.json(person);
            })
            .catch(err => {
              console.log(err);
              switch (err.code) {
                default:
                  res.status(400).send("Unable to update person to database");
                  break;
              }
            });
        })
        .catch(err => {
          console.log(err);
          switch (err.code) {
            default:
              res.status(400).send("Unable to update person's address to database");
              break;
          }
        });
    });
});


module.exports = personRoutes;