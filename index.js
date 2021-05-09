const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('users.sqlite3');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const PORT =  3000;



app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/registration', function(req, res) {
  res.render('registration');
});

app.post('/registration', urlencodedParser, function(req, res) {
  if(!req.body) return res.sendStatus(400);
  var stmt = db.prepare("INSERT INTO users (login, password, score) VALUES(?,?,?)");
  stmt.run(req.body.email, req.body.password, 0);
  res.render('registration');
});

app.listen(PORT, () => {
  console.log('Server has been started...');
});
