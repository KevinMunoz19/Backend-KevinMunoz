const router = require('express').Router();
const transactions = require('../controllers/transaction.controller');
const auth = require('../middleware/auth');

module.exports = (app) => {
  // Create a new Tutorial
  router.post('/create', auth, transactions.create);

  // Retrieve all Tutorials
  // router.get('/', auth, transactions.findAll);
  router.get('/getAll', auth, transactions.findAll);

  app.use('/api/transactions', router);
};
