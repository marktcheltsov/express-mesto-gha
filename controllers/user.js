const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (e) {
    console.error(e);
    const err = new Error('произошла ошибка');
    err.statusCode = 500;
    next(err);
  }
};

const creatUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        console.log(e);
        const err = new Error('Переданы некорректные данные при создани');
        err.statusCode = 400;
        next(err);
      }
      console.error(e);
      const err = new Error('произошла ошибка');
      err.statusCode = 500;
      next(err);
    });
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      const err = new Error('Запрашиваемый пользователь не найден');
      err.statusCode = 404;
      next(err);
    }
    return res.status(200).json(user);
  } catch (e) {
    if ((e.name === 'CastError') || (e.name === 'TypeError')) {
      console.error(e);
      const err = new Error('Переданы некорректные данные');
      err.statusCode = 400;
      next(err);
    }
    console.error(e);
    const err = new Error('произошла ошибка');
    err.statusCode = 500;
    next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      const err = new Error('Запрашиваемый пользователь не найден');
      err.statusCode = 404;
      next(err);
    }
    return res.status(200).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.log(e);
      const err = new Error('Переданы некорректные данные при создани');
      err.statusCode = 400;
      next(err);
    }
    console.error(e);
    const err = new Error('произошла ошибка');
    err.statusCode = 500;
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      const err = new Error('Запрашиваемый пользователь не найден');
      err.statusCode = 404;
      next(err);
    }
    return res.status(200).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.log(e);
      const err = new Error('Переданы некорректные данные при создани');
      err.statusCode = 400;
      next(err);
    }
    console.error(e);
    const err = new Error('произошла ошибка');
    err.statusCode = 500;
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error('Неправильные почта или пароль');
      err.statusCode = 401;
      next(err);
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      const err = new Error('Неправильные почта или пароль');
      err.statusCode = 401;
      next(err);
    }
    const token = jwt.sign(
      { _id: user._id },
      'some-secret-key',
      { expiresIn: '7d' },
    );
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    const err = new Error('произошла ошибка');
    err.statusCode = 500;
    next(err);
  }
};

module.exports = {
  getUsers,
  creatUser,
  getUser,
  updateUser,
  updateUserAvatar,
  login,
};
