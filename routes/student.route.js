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

studentRoutes.use(bodyParser.urlencoded({extended: true}));
studentRoutes.use(bodyParser.json());

const checkIfAuthenticated = expressJwt({
  secret: RSA_PUBLIC_KEY
});

function getMissingFields(values) {
  const requiredFields = ['firstName', 'lastName', 'email'];
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

  let student = new Student(req.body);

  student.save()
    .then(student => {
      res.json(student);
    })
    .catch(err => {
      console.log(err);
      switch (err.code) {
        default:
          res.status(400).send("unable to save to database");
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
  Student.find(function (err, students){
    if(err){
      console.log('err');
      console.log(err);
    } else {
      console.log('success');
      res.json(students);
    }
  });
});

module.exports = studentRoutes;