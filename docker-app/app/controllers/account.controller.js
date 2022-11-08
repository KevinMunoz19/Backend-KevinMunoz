/* eslint-disable consistent-return */
const db = require('../models');

const { Op } = db.Sequelize;
const Account = db.accounts;
const User = db.users;

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

exports.findAccountsById = (req, res) => {
  const { id } = req.params;
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

exports.findAccountByNumber = (accountNumber) => {
  const condition = accountNumber
    ? { id: { [Op.like]: `%${accountNumber}%` } }
    : null;

  Account.findAll({ where: condition })
    .then((data) => ({
      data,
      success: true,
    }))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      return {
        data: err,
        success: true,
      };
    });
};
