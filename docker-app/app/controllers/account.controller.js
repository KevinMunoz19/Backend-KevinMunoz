/* eslint-disable consistent-return */
const db = require('../models');

const Account = db.accounts;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  try {
    const { accountCurrency, accountName, accountBalance, userId } = req.body;
    if (!accountCurrency || !accountName || !accountBalance || !userId) {
      res.status(400).send({
        message: 'Content is missing.',
      });
      return;
    }

    // Create a Tutorial
    const account = {
      accountCurrency,
      accountName,
      accountBalance,
      userId,
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
