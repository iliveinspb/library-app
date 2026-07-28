console.log('🔥 server file started');

const express = require('express');
console.log('1');
const Book = require('./models/Book');
console.log('2');
const app = express();
console.log('3');
app.use(express.json());
console.log('4');

console.log('5');

const storage = {
  books: [],
};
console.log('6');

app.post('/api/user/login', (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: 'test@mail.ru' });
});
console.log('7');
//получаем весь массив
app.get('/api/books', (req, res) => {
  const { books } = storage;
  res.json(books);
});
console.log('8');

app.get('/api/books/:id', (req, res) => {
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
console.log('9');
//добавляем новую запись
app.post('/api/books', (req, res) => {
  const { books } = storage;
  const newBook = new Book(req.body);
  books.push(newBook);

  res.status(201);//статус на создание записи
  res.json(newBook);
});
console.log('10');
//обновление записи
app.put('/api/books/:id', (req, res) => {
  const { books } = storage;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const { id } = req.params;

  const idx = books.findIndex((el) => el.id === id);

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
console.log('11');
//удаляем запись по айди
app.delete('/api/books/:id', (req, res) => {
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
console.log('12');
const PORT = process.env.PORT || 3000;
console.log('13');
app.listen(PORT, () => {
  console.log(`🚀 server running on http://localhost:${PORT}`);
});
console.log('14');