const router = require('express').Router();

// * Middleware
const isAuthenticated = require('../middleware/isAuthenticated');

//* Controller
const login = require('../controller/login');

router.post('/login', login);

router.get('/logout', isAuthenticated, function (req, res) {
  req.logout();
  req.session.destroy(function (err) {
    return res.send({ message: 'Logged out' });
  });
});


module.exports = router;
