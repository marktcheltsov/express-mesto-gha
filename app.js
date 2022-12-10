const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;

const userRouter = require('./routes/userRoutes');

const cardRouter = require('./routes/cardRouter');

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.owner = {
    _id: '638a57a4667614b0eb00ff89',
  };
  next();
});

app.use('*', (req, res) => res.status(404).json({ message: 'указан неправильный путь' }));

app.use('/users', userRouter);

app.use('/cards', cardRouter);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});

