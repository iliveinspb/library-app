const express = require('express');
const router = express.Router();

const Book = require('../models/book');

const storage = require('../storage');

//получаем весь массив
router.get('/', (req, res) => {
  const { books } = storage;
  res.json(books);
});



//получаем книгу по id
router.get('/:id', (req, res) => {
  const { books } = storage;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404 | не найдено');
  }
});



//добавление книги
router.post('/', (req, res) => {
  const { books } = storage;
  const newBook = new Book(req.body);
  books.push(newBook);

  res.status(201);//статус на создание записи
  res.json(newBook);
});



//обновление записи полностью
router.put('/:id', (req, res) => {
  const { books } = storage;
  const { id } = req.params;
  
  const idx = books.findIndex((el) => el.id === id);

  const { title, description, authors, favorite, fileCover, fileName } = req.body;

  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    };

    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404 | не найдено');
  }
});

//обновление записи частично 
router.patch('/:id', (req, res) => {
  const { books } = storage;
  const { id } = req.params;
  
  const idx = books.findIndex((el) => el.id === id);


  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      ...req.body,
    };

    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404 | не найдено');
  }
});



//удаляем запись по айди
router.delete('/:id', (req, res) => {
  const { books } = storage;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json({ message: 'deleted' });
  } else {
    res.status(404);
    res.json('404 | не найдено');
  }
});



module.exports = router;