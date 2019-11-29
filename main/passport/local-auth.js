const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.model');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done (null,user);
});

passport.use('local-singup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const user = await User.findOne({'username': username})
  console.log(user)
  if(user) {
    done (null, false);
  } else {
    const newUser = new User();
    newUser.username = username;
    newUser.password = newUser.encryptPassword(password);
    console.log(newUser);
    await newUser.save();
    done(null, newUser);
  }
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const user = await User.findOne({username: username});
  if(!user) {
    return done(null, false);
  }
  if(!user.comparePassword(password)) {
    return done(null, false);
  }
  return done(null, user);
}));