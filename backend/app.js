require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const notFoundPage = require('./middlewares/notFoundPage');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', cardsRouter);
app.use(notFoundPage);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
