const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByName, getUserById) {
  const authenticateUser = async (username, password, done) => {
    const user = getUserByName(username);
    if(user == undefined) {
      return done(null, false, { message: 'Нет такого пользователя'});
    }

    try{
      if(await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Некорректный пароль'});
      }
    } catch(e) {
      return done(e);
    }

  }

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, authenticateUser));
  passport.serializeUser((user,done) => done(null, user.id));
  passport.deserializeUser((id,done) => {
    return done(null, getUserById(id));
  });


};


module.exports = initialize;
