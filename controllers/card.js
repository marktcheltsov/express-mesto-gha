const Card = require('../models/card')

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
  req.body.owner = req.owner
  try {
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
    if ((e.name === 'CastError') || (e.name === 'TypeError')) {
      console.error(e)
      return res.status(400).json({message: 'Переданы некорректные данные'})
    }
    console.error(e);
    return res.status(500).json({message: 'произошла ошибка'});
  }
};

const deleteCardLike = async (req, res) => {
  const {cardId} = req.params
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.owner._id } },
      { new: true },
    )
    if (!card) {
      return res.status(404).json({message: 'Запрашиваемая карточка не найдена'});
    }
    return res.status(200).json(card)
  } catch (e) {
    if ((e.name === 'CastError') || (e.name === 'TypeError')) {
      console.error(e)
      return res.status(400).json({message: 'Переданы некорректные данные'})
    }
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
      { $addToSet: { likes: req.owner._id } },
      { new: true },
    )
    if (!card) {
      return res.status(404).json({message: 'Запрашиваемая карточка не найдена'});
    }
    return res.status(200).json(card)
  } catch (e) {
    if ((e.name === 'CastError') || (e.name === 'TypeError')) {
      console.error(e)
      return res.status(400).json({message: 'Переданы некорректные данные'})
    }
    if (e.name === 'ValidationError') {
      console.log(e)
      return res.status(400).json({message: 'Переданы некорректные данные при создании'})
    }
    console.error(e);
    return res.status(500).json({message: 'произошла ошибка'});
  }
}

module.exports = {
  getCards,
  creatCard,
  deleteCard,
  deleteCardLike,
  addCardLike,
};