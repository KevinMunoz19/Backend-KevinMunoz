const router = require('express').Router();
const account = require('../controllers/account.controller');

module.exports = (app) => {
  // Create a new Tutorial
  router.post('/create', account.create);

  router.get('/:id', account.findAccountsById);

  app.use('/api/accounts', router);
};
