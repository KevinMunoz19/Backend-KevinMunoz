module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    userId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userEmail: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    userPassword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userToken: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
