const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// * Route imports

const auth = require('./routes/auth');
const car = require('./routes/car');
const booking = require('./routes/booking');
const { routes: user } = require('./user');

module.exports = function (app) {
  app.use(express.json());

  // * DB
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => console.log('Connection to MongoDB failed.\n', err));

  // * Session
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 604800000, // * 7 days
        sameSite: true,
      },
      store: new MongoStore({
        ttl: 604800000,
        mongooseConnection: mongoose.connection,
      }),
    }),
  );

  // * Passport init
  require('./config/passport-local');
  app.use(passport.initialize());
  app.use(passport.session());

  // * Routes
  app.use('/api/user', user);
  app.use('/api/auth', auth);

  app.use('/api/car', car);
  app.use('/api/bookCar', booking);

  // * Server
  const port = process.env.PORT || 3000;
  const server = app.listen(
    port,
    console.log(`Server started on port ${port}\nhttp://localhost:${port}/`),
  );

  // * Production setup
  if (process.env.NODE_ENV === 'production') {
    // * Handle unhandled promise exceptions
    process.on('uncaughtException', (err, promise) => {
      console.log(`Error: ${err.message}`);
    });
    // * Handle unhandled promise rejections
    process.on('unhandledRejection', (err, promise) => {
      console.log(`Error: ${err.message}`);
    });
  }
};
