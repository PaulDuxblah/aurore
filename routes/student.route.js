const express = require('express');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
const studentRoutes = express.Router();
const jwt = require('jsonwebtoken');
const fs = require("fs");
const RSA_PUBLIC_KEY = fs.readFileSync('jwtRS256.key.pub');
const config = require('../config/DB');
const salt = config.salt;
const bcrypt = require('bcrypt');

let Student = require('../models/Student');
let Address = require('../models/Address');
let Person = require('../models/Person');

studentRoutes.use(bodyParser.urlencoded({extended: true}));
studentRoutes.use(bodyParser.json());

const checkIfAuthenticated = expressJwt({
  secret: RSA_PUBLIC_KEY
});

function getMissingFields(values) {
  const requiredFields = ['person', 'inscriptionDate'];
  let missingFields = [];

  requiredFields.forEach(function(field) {
    if (!values[field]) {
      missingFields.push(field);
    }
  });

  return missingFields;
}

// CHECK IF CALLER IS AUTHORIZED
studentRoutes.route('*').all(checkIfAuthenticated, function (req, res, next) {
  next();
});

// POST
studentRoutes.route('/').post(function (req, res) {
  let missingFields = getMissingFields(req.body);
  if (missingFields.length > 0) {
    res.status(400).send('Not all required fields are present: ' + missingFields.join(', '));
    return;
  }

  const address = new Address(req.body.person.address);

  address.save()
  .then(address => {
    const person = new Person(req.body.person);
    person.address = address._id;

    person.save()
    .then(person => {
      const student = new Student(req.body);
      student.person = person._id;

      student.save()
      .then(student => {
        console.log('Student added!');
        res.json(student);
      })
      .catch(err => {
        console.log(err);
        switch (err.code) {
          default:
            res.status(400).send("Unable to save student to database");
            break;
        }
      });
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

// GET
studentRoutes.route('/:id').post(function (req, res) {
  Student.findOne({ id: req.id }, function (err, student) {
    if(err){
      console.log('err');
      console.log(err);
      return;
    }

    if (student === null) {
      res.status(400).json('Unknown student');
      return;
    }

    console.log('success');
    res.json(student);
  });
});

// GET ALL
studentRoutes.route('/').get(function (req, res) {
  Student.find()
  .populate({ path: 'person', populate: { path: 'address' } })
  .exec(function (err, students) {
    if(err){
      console.log('err');
      console.log(err);
    } else {
      console.log('success');
      res.json(students);
    }
  });
});

// PUT
studentRoutes.route('/:id').put(function (req, res) {
  let missingFields = getMissingFields(req.body);
  if (missingFields.length > 0) {
    res.status(400).send('Not all required fields are present: ' + missingFields.join(', '));
    return;
  }

  Student.findOne({ id: req.id }, function (err, student) {
    if(err){
      console.log('err');
      console.log(err);
      return;
    }

    if (student === null) {
      res.status(400).json('Unknown student');
      return;
    }

    console.log(student);
    req.body.forEach(function(key, value) {
      if (key === '_id') return;
      student[key] = value;
    });
    console.log(student);

    student.save()
    .then(student => {
      console.log('success');
      res.json(student);
    })
    .catch(err => {
      console.log(err);
      switch (err.code) {
        default:
          res.status(400).send("Unable to save student to database");
          break;
      }
    });
  });
});

module.exports = studentRoutes;