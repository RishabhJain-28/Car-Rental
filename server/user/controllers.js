const { pick, omit } = require('lodash');
const crypto = require('crypto');

//* Models
const User = require('./model');
// const { model: Product } = require('../products');

// * Middleware
const isAuthenticated = require('../middleware/isAuthenticated');

// * Validators
const validator = require('./validators');

//* Nodemailer config
const { transport, createEmail } = require('../config/nodemailer');

// * Create new user
// ! Add rate limiting and acc verification
exports.createUser = async (req, res, next) => {
  const { value, error } = validator.newUser(req.body);
  if (error)
    return res.status(400).send({
      error: 'Invalid user detials',
      message: error.details[0].message,
    });

  if (value.password !== value.confirmPassword)
    return res.status(400).send({ message: 'Passwords do not match.' });

  const existingUser = await User.findOne({ email: value.email });

  if (existingUser) return res.status(400).send({ message: 'email already registered.' });

  const reqBody = pick(value, ['firstName', 'lastName', 'email']);
  const password = await User.hashPassword(value.password);
  const newUser = new User({
    ...reqBody,
    password,
  });
  await newUser.save();
  //?!
  req.body = { email: newUser.email, password: value.password };
  // res.redirect("/user/login");
  // res.send(newUser);
  next();
};

// * Get user profile
exports.getUserProfile = [
  isAuthenticated,
  (req, res) => {
    res.send({ user: omit(req.user.toJSON(), ['password']) });
  },
];

// * Forgot password - Generate email
exports.forgetPassword = async (req, res) => {
  const { value, error } = validator.forgetPassword(req.body);
  if (error)
    return res.status(400).send({
      error: 'Invalid Email',
      message: error.details[0].message,
    });

  const user = await User.findOne({ email: value.email });
  if (!user) return res.status(400).send({ message: 'No user found' });

  user.forgetPassword.token = crypto.randomBytes(20).toString('hex');
  user.forgetPassword.expires = Date.now() + 3600000;
  await user.save();

  const link = `${process.env.CLIENT_URL}/forgetPassword/${user.forgetPassword.token}`;

  await transport.sendMail({
    from: 'rx@zxc.com',
    to: user.email,
    subject: 'password reset request',
    html: createEmail(
      `Your password reset token is here \n\n <a href="${link}">click here to reset password</a>`,
    ),
  });

  res.send({ message: 'reset email send' });
};

// * Forgot password - Enter new password
exports.forgetPasswordReset = async (req, res) => {
  const { value, error } = validator.forgetPasswordReset({
    ...req.body,
    token: req.params.token,
  });
  if (error)
    return res.status(400).send({
      error: 'Invalid',
      message: error.details[0].message,
    });
  if (value.password !== value.confirmPassword)
    return res.status(400).send({ message: 'Passwords do not match.' });
  //   console.log('token', req.params.token);
  const user = await User.findOne({
    'forgetPassword.token': value.token,
    'forgetPassword.expires': { $gt: Date.now() },
  });

  if (!user) return res.send({ message: 'Reset link is invalid.' });

  user.forgetPassword.token = undefined;
  user.forgetPassword.expires = undefined;

  await user.setPassword(value.password);
  await user.save();

  res.send({ message: 'Password reset complete.' });
};

// * Change password
exports.changePassword = [
  isAuthenticated,
  async (req, res) => {
    const { value, error } = validator.changePassword(req.body);
    if (error)
      return res.status(400).send({
        error: 'Invalid',
        message: error.details[0].message,
      });

    console.log(value);
    console.log(req.user);
    const isCorrect = await req.user.verifyPassword(value.oldPassword);
    if (!isCorrect) return res.status(400).send({ errror: 'Incorrect Password' });

    if (value.newPassword !== value.confirmNewPassword)
      return res.status(400).send({ errror: 'New passwords do not match.' });
    await req.user.setPassword(value.newPassword);
    await req.user.save();
    req.session.destroy(function (err) {
      // ! login user again ?
      return res.send({ message: 'Password changed successfully' });
    });
  },
];

exports.update = [
  isAuthenticated,
  async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...req.body,
      },
      {
        new: true,
      },
    );

    console.log(user);
    return res.send(user);
  },
];

// // * Get watchlist of the user
// exports.getWatchlist = [
//   isAuthenticated,
//   async (req, res) => {
//     await req.user.populate('watchlist').execPopulate();
//     // console.log(req.user.toJSON());
//     res.send({
//       watchlist: req.user.watchlist,
//     });
//   },
// ];

// // * Add a product to watchlist
// exports.addToWatchlist = [
//   isAuthenticated,
//   async (req, res) => {
//     const { productId } = req.params;
//     const product = await Product.findById(productId);
//     if (!product) return res.status(400).send({ error: 'Invalid product id' });
//     const alreadyInWatchlist = req.user.watchlist.includes(productId);
//     if (alreadyInWatchlist)
//       return res.status(400).send({ error: 'product already added in watchlist' });
//     req.user.watchlist.push(productId);
//     await req.user.save();
//     res.send({
//       message: 'product added to watchlist',
//       product,
//       updatedWatchlist: req.user.watchlist,
//     });
//   },
// ];

// // * Remove a product to watchlist
// exports.removeFromWatchlist = [
//   isAuthenticated,
//   async (req, res) => {
//     const { productId } = req.params;
//     req.user.watchlist = req.user.watchlist.filter((t) => t.toString().trim() !== productId.trim());
//     await req.user.save();
//     res.send({
//       message: 'product removed from watchlist',
//       updatedWatchlist: req.user.watchlist,
//     });
//   },
// ];

// // * Get cart of the user
// exports.getCart = [
//   isAuthenticated,
//   async (req, res) => {
//     await req.user.populate('cart.product').execPopulate();
//     console.log(req.user);
//     res.send({
//       cart: req.user.cart,
//     });
//   },
// ];

// * Add product to cart
exports.addToCart = [
  isAuthenticated,
  async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    //! check out of stock ?
    if (!product) return res.status(400).send({ error: 'Invalid product id' });
    const itemInCart = req.user.cart.find((p) => p.product.toString().trim() === productId);
    if (!itemInCart) {
      req.user.cart.push({ product: productId, qty: 1 });
    } else {
      itemInCart.qty++;
    }
    await req.user.save();
    res.send({
      message: 'product added to cart',
      product: product,
      updatedcart: req.user.cart,
    });
  },
];

// * Remove product from cart
exports.removeFromCart = [
  isAuthenticated,
  async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return res.status(400).send({ error: 'Invalid product id' });
    const itemIndex = req.user.cart.findIndex((p) => p.product.toString().trim() === productId);
    if (itemIndex === -1) return res.status(400).send({ error: 'Product not found in the cart' });

    req.user.cart[itemIndex].qty--;
    const qty = req.user.cart[itemIndex].qty;
    if (qty === 0) req.user.cart.splice(itemIndex, 1);
    await req.user.save();
    res.send({
      message: 'product removed from cart',
      qty: qty,
      updatedcart: req.user.cart,
    });
  },
];
