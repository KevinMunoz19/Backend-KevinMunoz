/* eslint-disable consistent-return */
const db = require('../models');

const Transaction = db.transactions;
const Account = db.accounts;
const { Op } = db.Sequelize;

// Create and Save
exports.create = async (req, res) => {
  // Validate request
  const {
    accountIdFrom,
    accountIdTo,
    transactionAmount,
    transactionComments,
    transactionType,
  } = req.body;
  if (
    !accountIdFrom ||
    !accountIdTo ||
    !transactionAmount ||
    !transactionComments ||
    !transactionType
  ) {
    res.status(400).send({
      message: 'Content is missing.',
    });
    return;
  }

  const accountFrom = await Account.findOne({
    raw: true,
    where: { accountNumber: accountIdFrom },
  });
  const accountTo = await Account.findOne({
    raw: true,
    where: { accountNumber: accountIdTo },
  });
  if (!accountFrom || !accountTo) {
    return res.status(409).send('Account does not exists');
  }

  const transactionAmountDecimal = +(+transactionAmount).toFixed(5);
  let accountFromBalance = +(+accountFrom.accountBalance).toFixed(5);

  if (accountFromBalance < transactionAmountDecimal) {
    return res.status(409).send('Not enough funds available');
  }

  let accountToBalance = +(+accountTo.accountBalance).toFixed(5);

  accountFromBalance -= transactionAmountDecimal;
  accountFromBalance = +(+accountFromBalance).toFixed(5);

  accountToBalance += transactionAmountDecimal;
  accountToBalance = +(+accountToBalance).toFixed(5);

  await Account.update(
    { accountBalance: accountFromBalance },
    {
      where: { accountNumber: accountIdFrom },
    }
  );

  await Account.update(
    { accountBalance: accountToBalance },
    {
      where: { accountNumber: accountIdTo },
    }
  );

  // Create
  const transaction = {
    accountNameFrom: accountFrom.accountName,
    accountIdFrom: req.body.accountIdFrom,
    accountNameTo: accountTo.accountName,
    accountIdTo: req.body.accountIdTo,
    transactionAmount: req.body.transactionAmount,
    transactionComments: req.body.transactionComments
      ? req.body.transactionComments
      : 'None',
    transactionType: req.body.transactionType,
  };

  Transaction.create(transaction)
    .then((dataTransaction) => res.send(dataTransaction))
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Transaction.',
      })
    );
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
