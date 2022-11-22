module.exports = (sequelize, Sequelize) => {
  const Record = sequelize.define('record', {
    recordId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    recordAccountId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    recordAccountName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    recordDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    recordAmount: {
      type: Sequelize.DECIMAL(10, 5),
      allowNull: false,
    },
    recordNumber: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
    },
    recordComments: {
      type: Sequelize.STRING,
    },
    recordCategory: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    recordIsExpense: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });

  return Record;
};
