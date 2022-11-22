const router = require('express').Router();
const records = require('../controllers/record.controller');
const auth = require('../middleware/auth');

module.exports = (app) => {
  // Create a new Tutorial
  router.post('/create', auth, records.create);

  // Retrieve all Tutorials
  router.get('/getAll', auth, records.findAll);

  app.use('/api/records', router);
};
