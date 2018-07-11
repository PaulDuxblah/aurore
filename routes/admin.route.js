const express = require('express');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
const adminRoutes = express.Router();
const jwt = require('jsonwebtoken');
const fs = require("fs");
const RSA_PUBLIC_KEY = fs.readFileSync('jwtRS256.key.pub');
const RSA_PRIVATE_KEY = fs.readFileSync('jwtRS256.key');
const config = require('../config/DB');
const salt = config.salt;
const bcrypt = require('bcrypt');

const checkIfAuthenticated = expressJwt({
  secret: RSA_PUBLIC_KEY
});

let Admin = require('../models/Admin');

adminRoutes.use(bodyParser.urlencoded({extended: true}));
adminRoutes.use(bodyParser.json());

function generateJWT(adminId) {
  return jwt.sign({}, RSA_PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: 3600,
    subject: adminId
  });
}

function getJWTObject(jwtBearerToken, admin) {
  return {
    idToken: jwtBearerToken, 
    admin: {
      _id: admin._id,
      email: admin.email
    },
    expiresIn: 3600
  };
}

function adminLogged(res, admin) {
    console.log('success');
    const jwtBearerToken = generateJWT(admin.id);
    res.cookie("AdminID", jwtBearerToken, { httpOnly: true, secure: true });
    res.status(200).json(getJWTObject(jwtBearerToken, admin));
}

// REGISTER
adminRoutes.route('/add').post(checkIfAuthenticated, function (req, res) {
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  let admin = new Admin(req.body);

  admin.save()
    .then(admin => {
      adminLogged(res, admin);
    })
    .catch(err => {
      console.log(err);
      switch (err.code) {
        case 11000:
          res.status(400).send("This email already exists");
          break;
        default:
          res.status(400).send("unable to save to database");
          break;
      }
    });
});

// LOGIN
adminRoutes.route('/login').post(function (req, res) {
  Admin.findOne({ email: req.body.email, password: bcrypt.hashSync(req.body.password, salt) }, function (err, admin) {
    if(err){
      console.log('err');
      console.log(err);
      return;
    }

    if (admin === null) {
      res.status(400).json('Incorrect email / password combinaison');
      return;
    }

    adminLogged(res, admin);
  });
});

// GET ALL
adminRoutes.route('/').get(checkIfAuthenticated, function (req, res) {
  Admin.find(function (err, admins){
    if(err){
      console.log('err');
      console.log(err);
    } else {
      console.log('success');
      res.json(admins);
    }
  });
});

module.exports = adminRoutes;