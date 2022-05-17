const express = require('express');

// * Controllers
const controllers = require('./controllers');

const router = express.Router();

const login = require('../controller/login');

// console.log(controllers.createUser);
router.post('/new', controllers.createUser, login);
router.get('/profile', ...controllers.getUserProfile);

router.post('/forgetPassword', controllers.forgetPassword);

router.post('/forgetPassword/:token', controllers.forgetPasswordReset);

router.post('/changePassword', ...controllers.changePassword);
router.put('/update', ...controllers.update);

// router.get('/watchlist', ...controllers.getWatchlist);

// router.put('/watchlist/add/:productId', ...controllers.addToWatchlist);

// router.put('/watchlist/delete/:productId', ...controllers.removeFromWatchlist);

// router.get('/cart', ...controllers.getCart);

// router.put('/cart/add/:productId', controllers.addToCart);

// router.put('/cart/delete/:productId', controllers.removeFromCart);

module.exports = router;
