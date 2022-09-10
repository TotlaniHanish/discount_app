var express = require('express');
var bodyParser = require('body-parser');

var db = require('./models/index');

var app = express();

var indexRouter = require('./routes/indexRouter');
var partyRouter = require('./routes/partyRouter');
const { application } = require('express');
const { verifyToken } = require('./utils/jwtUtil');

app.use(bodyParser.json());


db.sequelize.sync();

app.use('/', indexRouter);
app.use('/party', verifyToken, partyRouter);

app.listen(5000, function () {
    console.log('Node app is running on port 5000');
});