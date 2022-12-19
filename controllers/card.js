const Card = require('../models/card');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (e) {
    console.error(e);
    const err = new Error('произошла ошибка');
    err.statusCode = 500;
    next(err);
  }
};

const creatCard = async (req, res, next) => {
  req.body.owner = req.user._id;
  try {
    const card = await Card.create(req.body);
    return res.status(201).json(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.log(e);
      const err = new Error('Переданы некорректные данные при создании');
      err.statusCode = 400;
      next(err);
    }
    console.log(e);
    const err = new Error('произошла ошибка');
    err.statusCode = 500;
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId, owner } = req.params;
    console.log(req.params);
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) {
      const err = new Error('Запрашиваемая карточка не найдена');
      err.statusCode = 404;
      next(err);
    }
    if (owner !== req.user._id) {
      const err = new Error('у вас нет прав на это');
      err.statusCode = 400;
      next(err);
    }
    return res.status(200).json(card);
  } catch (e) {
    if ((e.name === 'CastError') || (e.name === 'TypeError')) {
      console.error(e);
      const err = new Error('Переданы некорректные данные при создании');
      err.statusCode = 400;
      next(err);
    }
    console.error(e);
    const err = new Error('произошла ошибка');
    err.statusCode = 500;
    next(err);
  }
};

const deleteCardLike = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      const err = new Error('Запрашиваемая карточка не найдена');
      err.statusCode = 404;
      next(err);
    }
    return res.status(200).json(card);
  } catch (e) {
    if ((e.name === 'CastError') || (e.name === 'TypeError')) {
      console.error(e);
      const err = new Error('Переданы некорректные данные');
      err.statusCode = 400;
      next(err);
    }
    if (e.name === 'ValidationError') {
      console.log(e);
      const err = new Error('Переданы некорректные данные при создании');
      err.statusCode = 400;
      next(err);
    }
    console.error(e);
    const err = new Error('произошла ошибка');
    err.statusCode = 500;
    next(err);
  }
};

const addCardLike = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      const err = new Error('Запрашиваемая карточка не найдена');
      err.statusCode = 404;
      next(err);
    }
    return res.status(200).json(card);
  } catch (e) {
    if ((e.name === 'CastError') || (e.name === 'TypeError')) {
      console.error(e);
      const err = new Error('Переданы некорректные данные');
      err.statusCode = 400;
      next(err);
    }
    if (e.name === 'ValidationError') {
      console.log(e);
      const err = new Error('Переданы некорректные данные при создании');
      err.statusCode = 400;
      next(err);
    }
    console.error(e);
    const err = new Error('произошла ошибка');
    err.statusCode = 500;
    next(err);
  }
};

module.exports = {
  getCards,
  creatCard,
  deleteCard,
  deleteCardLike,
  addCardLike,
};
