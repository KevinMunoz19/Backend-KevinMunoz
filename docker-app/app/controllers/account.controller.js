/* eslint-disable consistent-return */
const db = require('../models');

const Account = db.accounts;
const User = db.users;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  const id = req.userId;
  // Validate request
  try {
    const { accountCurrency, accountName, accountBalance } = req.body;
    if (!accountCurrency || !accountName || !accountBalance) {
      res.status(400).send({
        message: 'Content is missing.',
      });
      return;
    }
    if (!id) {
      res.status(401).send({
        message: 'Auth is missing',
      });
      return;
    }

    // Create a Tutorial
    const account = {
      accountCurrency,
      accountName,
      accountBalance,
      userId: id,
    };

    // Save Tutorial in the database
    Account.create(account)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the account.',
        });
      });
  } catch (err) {
    console.log(err);
  }
};

exports.findAccountsById = (req, res) => {
  const id = req.userId;
  if (!id) {
    res.status(401).send({
      message: 'Auth is missing',
    });
    return;
  }
  return User.findByPk(id, { include: ['accounts'] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).send({
        message: `Error retrieving accounts with userId=${id}`,
      });
    });
};
