const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: '0',

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.transactions = require('./transaction.model')(sequelize, Sequelize);
db.users = require('./user.model')(sequelize, Sequelize);
db.accounts = require('./account.model')(sequelize, Sequelize);
db.records = require('./record.model')(sequelize, Sequelize);

db.users.hasMany(db.accounts, {
  foreignKey: 'userId',
  as: 'accounts',
});
db.accounts.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user',
});

db.users.hasMany(db.records, {
  foreignKey: 'userId',
  as: 'records',
});
db.records.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user',
});

db.users.hasMany(db.transactions, {
  foreignKey: 'userId',
  as: 'transactions',
});
db.transactions.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = db;
