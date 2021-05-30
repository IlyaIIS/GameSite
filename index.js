const PORT =  3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const sqlite = require('sqlite-sync');

const initializePassport = require('./passport-config');


function GetUserByName(username) {
  sqlite.connect('users.sqlite3');
  try {
    var result = sqlite.run("SELECT * FROM users WHERE username = " + `'${username}'`);
    return result[0];
  } catch (err) {
    return err
  }
};

function GetUserById(id) {
  sqlite.connect('users.sqlite3');
  try {
    var result = sqlite.run("SELECT * FROM users WHERE id = " + id);
    return result[0];
  } catch (err) {
    return err
  }
};

function GetScoreByName(username) {
  sqlite.connect('users.sqlite3');
  try {
    var result = sqlite.run("SELECT * FROM users WHERE username = " + `'${username}'`);
    return result[0].score;
  } catch (err) {
    return err
  }
};

initializePassport(
  passport,
  GetUserByName,
  GetUserById
);

var db = new sqlite3.Database('users.sqlite3');

var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.use(flash());
app.use(session({
  resave: false,
  secret: 'RamzanKadirov',
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', function(req,res) {

  sqlite.connect('users.sqlite3');
  var result = sqlite.run("SELECT * FROM users ORDER BY score DESC LIMIT 10");

  if(req.isAuthenticated()) {
    res.render('index', {
      name: req.user.username,
      score: GetScoreByName(req.user.username),
      top1: result[0].username + ' - ' + result[0].score,
      top2: result[1].username + ' - ' + result[1].score,
      top3: result[2].username + ' - ' + result[2].score,
      top4: result[3].username + ' - ' + result[3].score,
      top5: result[4].username + ' - ' + result[4].score,
      top6: result[5].username + ' - ' + result[5].score,
      top7: result[6].username + ' - ' + result[6].score,
      top8: result[7].username + ' - ' + result[7].score,
      top9: result[8].username + ' - ' + result[8].score,
      top10: result[9].username + ' - ' + result[9].score
    });
  } else {
    res.render('index', {
       name: 'гость',
       score: 0,
       top1: result[0].username + ' - ' + result[0].score,
       top2: result[1].username + ' - ' + result[1].score,
       top3: result[2].username + ' - ' + result[2].score,
       top4: result[3].username + ' - ' + result[3].score,
       top5: result[4].username + ' - ' + result[4].score,
       top6: result[5].username + ' - ' + result[5].score,
       top7: result[6].username + ' - ' + result[6].score,
       top8: result[7].username + ' - ' + result[7].score,
       top9: result[8].username + ' - ' + result[8].score,
       top10: result[9].username + ' - ' + result[9].score
     });
  };
});

const jsonParser = express.json();

app.post('/score', jsonParser, function(req,res) {
  if( req.isAuthenticated() ) {
    let score = req.body.score;
    sqlite.connect('users.sqlite3');
    var result = sqlite.run("SELECT * FROM users WHERE username = " + `'${req.user.username}'`);
    if(result[0].score < score) {
      sqlite.run(`UPDATE users SET score = ${score} WHERE username = ` + `'${req.user.username}'`);
    };

  };

});


app.post('/registration', urlencodedParser,async function(req, res) {
  if(!req.body) return res.sendStatus(400);

  try {
    const hashedPassword = await bcrypt.hash(req.body.password1, 10);
    var stmt = db.prepare("INSERT INTO users (username, password, score) VALUES(?,?,?)");
    stmt.run(req.body.regUsername, hashedPassword, 0);
  } catch {

  };


  res.redirect('/');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/#check2',
    failureFlash: true
  }));

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      res.redirect('/');
    }
    next();
  };


var server = app.listen(PORT, () => {
  console.log('Оно живое');
});

const socket = require('socket.io');

var io = socket(server);

io.on('connection', function(socket) {

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });
});
