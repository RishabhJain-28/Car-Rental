const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const { model: User } = require('../user');

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async function (email, password, done) {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect login credentials' });
      }
      const isCorrect = await user.verifyPassword(password);
      if (!isCorrect) {
        return done(null, false, { message: 'Incorrect login credentials' });
      }
      return done(null, user);
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (!user) return done(null, false, { message: 'No user found' });
  done(null, user);
});
