const router = require('express').Router();
const users = require('../controllers/user.controller');

module.exports = (app) => {
  // Create a new Tutorial
  router.post('/signup', users.create);

  // Retrieve a single Tutorial with id
  router.post('/login', users.findOne);

  app.use('/api/users', router);
};
