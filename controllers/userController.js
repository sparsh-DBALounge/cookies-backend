import bcrypt from 'bcrypt';
import db from '../models/index.js';
import jwt from 'jsonwebtoken';

const User = db.users;

const generateToken = (req, res, user) => {
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: 1 * 24 * 60 * 60,
  });
  console.log(token);
  res.cookie('token', token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.status(200).send(user);
};

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: bcrypt(password, 10),
    };
    const transcation = await db.sequelize.transaction();

    const user = await User.create(data, { transcation }); // When transaction is used then the data is in dataValues otherwise
    // its directly the object returned
    if (!user) {
      return res.status(409).send('Signup Failed, Try Again!');
    }
    res.status(201).send('Signup Successful');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) res.status(404).send('No User Found');
    else {
      const isSame = await bcrypt.compare(password, user.password);

      if (!isSame) {
        res.status(400).send('Incorrect Credentials');
      } else {
        generateToken(req, res, user);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
