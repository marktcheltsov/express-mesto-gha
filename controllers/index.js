const User = require('../models/users')
const Card = require('../models/card')

const myUser = {
  id:'638a57a4667614b0eb00ff89'
}

req.body.owner = myUser.id

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
    console.error(e)
    return res.status(500).json({message: 'произошла ошибка'})
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({})
    return res.status(200).json(cards)
  } catch (e){
    console.error(e)
    return res.status(500).json({message: 'произошла ошибка'})
  }
};

const creatCard = async (req, res) => {
  try {
    req.owner = myUser.id
    const card = await Card.create(req.body);
    return res.status(201).json(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.log(e)
      return res.status(400).json({message: 'Переданы некорректные данные при создании'})
    }
    console.log(e)
    return res.status(500).json({message: 'произошла ошибка'})
  }
};

const deleteCard = async (req, res) => {
  try {
    const {cardId} = req.params;
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) {
      return res.status(404).json({message: 'Запрашиваемая карточка не найдена'});
    }
    return res.status(200).json(card);
  } catch (e) {
    console.error(e);
    return res.status(500).json({message: 'произошла ошибка'});
  }
};

const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.body.owner, {avatar: avatar});
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
    const user = await User.findByIdAndUpdate(req.body.owner, {name: name, about: about})
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

const deleteCardLike = async (req, res) => {
  const {cardId} = req.params
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: myUser.id } },
      { new: true },
    )
    if (!card) {
      return res.status(404).json({message: 'Запрашиваемая карточка не найдена'});
    }
    return res.status(200).json(card)
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.log(e)
      return res.status(400).json({message: 'Переданы некорректные данные при создании'})
    }
    console.error(e);
    return res.status(500).json({message: 'произошла ошибка'});
  }
}

const addCardLike = async (req, res) => {
  const {cardId} = req.params
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: myUser.id } },
      { new: true },
    )
    if (!card) {
      return res.status(404).json({message: 'Запрашиваемая карточка не найдена'});
    }
    return res.status(200).json(card)
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
  getCards,
  creatCard,
  deleteCard,
  deleteCardLike,
  addCardLike,
};
