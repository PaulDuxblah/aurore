const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config/DB');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database ' + err)}
);

const adminRoute = require('./routes/admin.route');
const studentRoute = require('./routes/student.route');

app.use(bodyParser.json());
app.use(cors());
var port = process.env.PORT || 4000;

app.use('/admins', adminRoute);
app.use('/students', studentRoute);

var server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});