require('reflect-metadata')

const express = require('express')
const app = express()
const booksRouter = require('./routes/books')
const logger = require('./middleware/logger')
const error404 = require('./middleware/err-404')
const path = require('path')
const container = require('./container')
const BooksRepository = require('./models/books-repository')
const connectToDatabase = require('./db')

const getBooksRepository = () => container.get(BooksRepository)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger) //сначала логгер!
app.use('/api/books', booksRouter)


app.post('/api/user/login', (req, res) => {
  res.status(201)
  res.json({ id: 1, mail: 'test@mail.ru' })
})

app.get('/', async (req, res) => {
  const repo = getBooksRepository()
  const books = await repo.getBooks()

  res.render('index', {
    title: 'Все книги',
    books
  })
})

app.post('/books', async (req, res) => {
  const repo = getBooksRepository()
  const book = await repo.createBook({
    title: req.body.title,
    description: req.body.description,
    authors: req.body.authors
  })

  res.redirect(`/books/${book.id}`)
})

app.get('/books/:id', async (req, res) => {
  const repo = getBooksRepository()
  const book = await repo.getBook(req.params.id)

  if (!book) {
    return res.status(404).send('Книга не найдена')
  }

  res.render('view', {
    title: book.title,
    book
  })
})

app.post('/books/:id', async (req, res) => {
  const repo = getBooksRepository()
  const book = await repo.patchBook(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    authors: req.body.authors,
    favorite: req.body.favorite || ''
  })

  if (!book) {
    return res.status(404).send('Книга не найдена')
  }

  res.redirect(`/books/${book.id}`)
})

app.get('/create', (req, res) => {
  res.render('create', {
    title: 'Добавить книгу'
  })
})

app.get('/update/:id', async (req, res) => {
  const repo = getBooksRepository()
  const book = await repo.getBook(req.params.id)

  if (!book) {
    return res.status(404).send('Книга не найдена')
  }

  res.render('update', {
    title: 'Редактировать книгу',
    book
  })
})

app.use(error404)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ error: err.message })
})

const PORT = process.env.PORT || 3000

async function start() {
  try {
    await connectToDatabase()

    app.listen(PORT, () => {
      console.log(`🚀 server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Не удалось подключиться к MongoDB:', error.message)
    process.exit(1)
  }
}

start()
