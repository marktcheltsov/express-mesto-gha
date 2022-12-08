const User = require('../models/users')

const getUsers = async (req, res) => {
  console.log(req.params)
  try {
    const users = await User.find({})
    return res.status(200).json(users)
  } catch (e){
    console.error(e)
    return res.status(500).json({message: 'произошла ошибка'})
  }
};

const creatUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    return res.status(201).json(user)
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.log(e)
      return res.status(400).json({message: 'Переданы некорректные данные при создании'})
    }
    console.error(e)
    return res.status(500).json({message: 'произошла ошибка'})
  }
};

const getUser = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({message: 'Запрашиваемый пользователь не найден'})
    }
    return res.status(200).json(user);
  } catch (e) {
    if ((e.name === 'CastError') || (e.name === 'TypeError')) {
      console.error(e)
      return res.status(400).json({message: 'Переданы некорректные данные'})
    }
    console.error(e)
    return res.status(500).json({message: 'произошла ошибка'})
  }
};

const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.owner._id,
      { avatar },
      { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({message: 'Запрашиваемый пользователь не найден'});
    }
    return res.status(200).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.log(e)
      return res.status(400).json({message: 'Переданы некорректные данные при создании'})
    }
    console.error(e);
    return res.status(500).json({message: 'произошла ошибка'});
  }
}

const updateUser = async (req, res) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.owner._id,
      { name, about },
      { new: true, runValidators: true }
    )
    if (!user) {
      return res.status(404).json({message: 'Запрашиваемый пользователь не найден'});
    }
    return res.status(200).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.log(e)
      return res.status(400).json({message: 'Переданы некорректные данные при создании'})
    }
    console.error(e);
    return res.status(500).json({message: 'произошла ошибка'});
  }
}

module.exports = {
  getUsers,
  creatUser,
  getUser,
  updateUser,
  updateUserAvatar,
};