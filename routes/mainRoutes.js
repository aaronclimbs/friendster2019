const express = require('express');
const mainRouter = express.Router();

// html routes
Router.get("/", (req, res) => {
  res.render('home')
});

Router.get("/survey", (req, res) => {
  res.render('survey')
});

module.exports = mainRouter;
