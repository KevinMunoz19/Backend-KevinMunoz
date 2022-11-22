const router = require('express').Router();
const account = require('../controllers/account.controller');
const auth = require('../middleware/auth');

module.exports = (app) => {
  // Create a new Tutorial
  router.post('/create', auth, account.create);

  router.get('/getAll', auth, account.findAccountsById);

  app.use('/api/accounts', router);
};
