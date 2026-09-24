const express = require('express')
const app = express()
const booksRouter = require('./routes/books')
const logger = require('./middleware/logger')
const error404 = require('./middleware/err-404')
const path = require('path')
const storage = require('./storage')
const connectToDatabase = require('./db')


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

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Все книги',
        books: storage.books
    })
})

app.get('/books/:id', (req, res) => {
    const book = storage.books.find(el => el.id === req.params.id)

    if (!book) {
        return res.status(404).send('Книга не найдена')
    }

    res.render('view', {
        title: book.title,
        book
    })
})

app.get('/create', (req, res) => {
    res.render('create', {
        title: 'Добавить книгу'
    })
})

app.get('/update/:id', (req, res) => {
    const book = storage.books.find(el => el.id === req.params.id)

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
