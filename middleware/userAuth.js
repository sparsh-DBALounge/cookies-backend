import db from '../models/index.js';

const User = db.users;

export const saveUser = async (req, res, next) => {
  try {
    const userNameExists = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    if (userNameExists) {
      return res.status(409).send('userName already Exits');
    }

    const emailExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailExists) {
      return res.status(409).send('Email Already exists, use a different One');
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
