const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();
const { PORT = 3000 } = process.env;

const userRouter  = require('./routes/userRoutes.js');

const cardRouter  = require('./routes/cardRouter.js');

app.use(bodyParser.json())

app.use((req, res, next) => {
  req.user = {
    _id: '638a289978dd77e2120a046d'
  };
  next();
});

app.use('/users', userRouter);

app.use('/cards', cardRouter)

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, ()=>{
  console.log('jjj')
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })
});