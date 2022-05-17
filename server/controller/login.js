const passport = require('passport');
const { omit } = require('lodash');

const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).send({ error: 'invlaid login info', info });
    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.status(200).send({
        message: 'Login Successfull.',
        user: omit(user.toJSON(), ['password']),
      });
    });
  })(req, res, next);
};
module.exports = login;
