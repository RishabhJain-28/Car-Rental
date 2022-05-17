const next = require('next');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    const app = express();
    app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
    require('./server')(app);
    app.all('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      req.user = req.user?.toJSON(); // * client doesnt need mongoose obj
      // res.user = req.user?.toJSON();
      // console.log('user on server', req.user);
      return handle(req, res, parsedUrl);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
