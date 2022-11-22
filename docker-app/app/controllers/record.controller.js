/* eslint-disable consistent-return */
const db = require('../models');

const { Op } = db.Sequelize;

const Record = db.records;
const Account = db.accounts;

// Create and Save
exports.create = async (req, res) => {
  // Validate request
  const {
    recordAccountId,
    recordAmount,
    recordComments,
    recordCategory,
    recordIsExpense,
    userId,
  } = req.body;
  if (
    !recordAccountId ||
    !recordAmount ||
    !recordComments ||
    !recordCategory ||
    typeof recordIsExpense === 'undefined' ||
    !userId
  ) {
    res.status(400).send({
      message: 'Content is missing.',
    });
    return;
  }

  const accountFrom = await Account.findOne({
    raw: true,
    where: { accountNumber: recordAccountId },
  });
  if (!accountFrom) {
    return res.status(409).send('Account does not exists');
  }

  const recordAmountDecimal = +(+recordAmount).toFixed(5);
  let accountFromBalance = +(+accountFrom.accountBalance).toFixed(5);

  if (recordIsExpense && accountFromBalance < recordAmountDecimal) {
    return res.status(409).send('Not enough funds available');
  }

  if (recordIsExpense) {
    accountFromBalance -= recordAmountDecimal;
    accountFromBalance = +(+accountFromBalance).toFixed(5);
  } else {
    accountFromBalance += recordAmountDecimal;
    accountFromBalance = +(+accountFromBalance).toFixed(5);
  }

  await Account.update(
    { accountBalance: accountFromBalance },
    {
      where: { accountNumber: recordAccountId },
    }
  );

  // Create
  const record = {
    recordAccountId: req.body.recordAccountId,
    recordAccountName: accountFrom.accountName,
    recordAmount: req.body.recordAmount,
    recordCategory: req.body.recordCategory,
    recordComments: req.body.recordComments ? req.body.recordComments : 'None',
    recordIsExpense: req.body.recordIsExpense,
    userId: req.body.userId,
  };

  Record.create(record)
    .then((dataRecord) => res.send(dataRecord))
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Record.',
      })
    );
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const { id } = req.params;
  const condition = id ? { userId: { [Op.like]: `%${id}%` } } : null;
  Record.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving records.',
      });
    });
};
