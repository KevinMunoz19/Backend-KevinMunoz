/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

const User = db.users;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  try {
    const { firstName, lastName, userEmail, userPassword } = req.body;
    if (!firstName || !lastName || !userEmail || !userPassword) {
      res.status(400).send({
        message: 'Content is missing.',
      });
      return;
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ where: { userEmail } });

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    const encryptedPassword = await bcrypt.hash(userPassword, 10);

    // Create a Tutorial
    const user = {
      firstName,
      lastName,
      userEmail: userEmail.toLowerCase(),
      userPassword: encryptedPassword,
    };

    // Create token
    const token = jwt.sign(
      { user_id: user.userId, userEmail },
      process.env.TOKEN_KEY,
      {
        expiresIn: '1h',
      }
    );

    user.userToken = token;

    // Save Tutorial in the database
    User.create(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the User.',
        });
      });
  } catch (err) {
    console.log(err);
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      res.status(400).send({
        message: 'Content is missing.',
      });
      return;
    }
    const user = await User.findOne({
      where: { userEmail },
      include: ['accounts'],
    });
    console.log('user', user);
    if (user && (await bcrypt.compare(userPassword, user.userPassword))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.userId, userEmail },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h',
        }
      );

      // save user token
      user.userToken = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send('Invalid Credentials');
  } catch (err) {
    console.log(err);
  }
};
