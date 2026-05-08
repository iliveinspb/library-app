const express = require('express');
const { v4: uuid } = require('uuid');
const app = express();

class Book {
  constructor(
    id = uuid(),
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
  ) {
    {
      this.id = id;
      this.title = title;
      this.description = description;
      this.authors = authors;
      this.favorite = favorite;
      this.fileCover = fileCover;
      this.fileName = fileName;
    }
  }
}

const storage = {
  books: [],
};

const app = express();
app.use(express.json());

app.post('/api/user/login', (req, res) => {
  res.status(201);
  res.json = { id: 1, mail: 'test@mail.ru' };
});

app.get('/api/books', (req, res) => {
  const { books } = storage;
  res.json(books);
});

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

app.post('/api/books', (req, res) => {
  const { books } = storage;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  );
  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

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

app.delete('/api/books/:id', (req, res) => {
  const { books } = storage;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
  } else {
    res.status(404);
    res.json('404 | не найдено');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
