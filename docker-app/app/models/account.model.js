module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define('account', {
    accountId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    accountCurrency: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    accountName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    accountBalance: {
      type: Sequelize.DECIMAL(10, 5),
      allowNull: false,
    },
  });

  return Account;
};
