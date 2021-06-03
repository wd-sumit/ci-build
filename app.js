const express = require('express');
const Book = require('./service');

const app = express();

app.use(express.json())

app.post('/book', async (req, res, next) => {
  const book = await Book.create({
    name: req.body.name,
    author: req.body.author
  });
  res.status(201).json({
    book 
  });
});

app.get('/book', async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({
    books
  });
});

module.exports = app;
