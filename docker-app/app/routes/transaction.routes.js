const router = require('express').Router();
const transactions = require('../controllers/transaction.controller');

module.exports = (app) => {
  // Create a new Tutorial
  router.post('/', transactions.create);

  // Retrieve all Tutorials
  router.get('/', transactions.findAll);

  // Retrieve a single Tutorial with id
  router.get('/:id', transactions.findOne);

  app.use('/api/transactions', router);
};
