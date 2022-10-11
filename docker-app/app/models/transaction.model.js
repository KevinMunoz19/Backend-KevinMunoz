module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        transactionId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        accountNameFrom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        accountIdFrom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        accountNameTo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        accountIdTo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        transactionDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        transactionAmount: {
            type: Sequelize.DECIMAL(10, 5),
            allowNull: false
        },
        transactionNumber: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        transactionComments: {
            type: Sequelize.STRING
        },
        transactionType: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return Transaction;
};    