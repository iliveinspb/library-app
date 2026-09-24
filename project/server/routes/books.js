const express = require('express')
const router = express.Router()
const fileMulter = require('../middleware/file')
const container = require('../container')
const BooksRepository = require('../models/books-repository')

const storage = require('../storage')

//получаем весь массив
router.get('/', async (req, res) => {
  const repo = container.get(BooksRepository)
  const books = await repo.getBooks()
  res.json(books)
})

//получаем книгу по id
router.get('/:id', async (req, res) => {
  const repo = container.get(BooksRepository)
  const book = await repo.getBook(req.params.id)

  if (!book) {
    return res.status(404).json('404 | не найдено')
  }

  res.json(book)
})

//добавление книги
router.post('/', async (req, res) => {
  const repo = container.get(BooksRepository)
  const book = await repo.createBook(req.body)
  res.status(201).json(book)
})

//обновление записи полностью
router.put('/:id', async (req, res) => {
  const repo = container.get(BooksRepository)
  const book = await repo.updateBook(req.params.id, req.body)

  if (!book) {
    return res.status(404).json('404 | не найдено')
  }

  res.json(book)
})

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
router.delete('/:id', async (req, res) => {
  const repo = container.get(BooksRepository)
  const book = await repo.deleteBook(req.params.id)

  if (!book) {
    return res.status(404).json('404 | не найдено')
  }

  res.json('ok')
})

//добавляем файл
router.post('/:id/upload', 
    fileMulter.single('book-file'),

    (req, res) => {
        const { books } = storage;
        const { id } = req.params;
        
        
        if (!req.file) {
            res.status(400);
            return res.json('Файл не загружен');
        } 
        
        const {path} = req.file

        const idx = books.findIndex((el) => el.id === id);
        
        if (idx !== -1) {
            books[idx] = {
            ...books[idx],
            fileBook: path,
            };



        return res.json(books[idx])

        } else {
            res.status(404);
            res.json('404 | книга не найдена');
        }
    }
);

//отдаем файл пользователю
router.get('/:id/download', 

    (req, res) => {
        const { books } = storage;
        const { id } = req.params;

        const idx = books.findIndex((el) => el.id === id);

        if (idx !== -1) {   
            if (books[idx].fileBook){
                res.download(books[idx].fileBook)
            } else {
                res.status(404);
                res.json('404 | файл отсутствует');
            }
        } else {
                res.status(404);
                res.json('404 | книга не найдена');
            }
    }
);


module.exports = router;