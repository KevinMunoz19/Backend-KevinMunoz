const db = require('../models');

const Transaction = db.transactions;
const { Op } = db.Sequelize;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.accountNameFrom ||
    !req.body.accountIdFrom ||
    !req.body.accountNameTo ||
    !req.body.accountIdTo ||
    !req.body.transactionAmount ||
    !req.body.transactionComments ||
    !req.body.transactionType
  ) {
    res.status(400).send({
      message: 'Content is missing.',
    });
    return;
  }

  // Create a Tutorial
  const transaction = {
    accountNameFrom: req.body.accountNameFrom,
    accountIdFrom: req.body.accountIdFrom,
    accountNameTo: req.body.accountNameTo,
    accountIdTo: req.body.accountIdTo,
    transactionAmount: req.body.transactionAmount,
    transactionComments: req.body.transactionComments
      ? req.body.transactionComments
      : 'None',
    transactionType: req.body.transactionType,
  };

  // Save Tutorial in the database
  Transaction.create(transaction)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Transaction.',
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Transaction.findAll({ where: null })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving transactions.',
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const { id } = req.params;
  const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Transaction.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).send({
        message: `Error retrieving Transaction with id=${id}`,
      });
    });
};
