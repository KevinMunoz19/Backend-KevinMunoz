const router = require('express').Router();
const records = require('../controllers/record.controller');
// const auth = require('../middleware/auth');

module.exports = (app) => {
  // Create a new Tutorial
  router.post('/create', records.create);

  // Retrieve all Tutorials
  // router.get('/', auth, transactions.findAll);
  router.get('/:id', records.findAll);

  app.use('/api/records', router);
};
