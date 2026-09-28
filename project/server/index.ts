import 'reflect-metadata'

import express from 'express'
import path from 'path'
import type { Request, Response } from 'express'
import booksRouter from './routes/books'
import logger from './middleware/logger'
import error404 from './middleware/err-404'
import container from './container'
import BooksRepository from './models/books-repository'
import connectToDatabase from './db'

const app = express()

const getBooksRepository = () => container.get(BooksRepository)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger) // сначала логгер!
app.use('/api/books', booksRouter)

app.post('/api/user/login', (_req: Request, res: Response) => {
  res.status(201)
  res.json({ id: 1, mail: 'test@mail.ru' })
})

app.get('/', async (_req: Request, res: Response) => {
  const repo = getBooksRepository()
  const books = await repo.getBooks()

  res.render('index', {
    title: 'Все книги',
    books
  })
})

app.post('/books', async (req: Request, res: Response) => {
  const repo = getBooksRepository()
  const book = await repo.createBook({
    title: req.body.title,
    description: req.body.description,
    authors: req.body.authors
  })

  res.redirect(`/books/${book.id}`)
})

app.get('/books/:id', async (req: Request, res: Response) => {
  const repo = getBooksRepository()
  const book = await repo.getBook(String(req.params.id))

  if (!book) {
    return res.status(404).send('Книга не найдена')
  }

  res.render('view', {
    title: book.title,
    book
  })
})

app.post('/books/:id', async (req: Request, res: Response) => {
  const repo = getBooksRepository()
  const book = await repo.patchBook(String(req.params.id), {
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

app.get('/create', (_req: Request, res: Response) => {
  res.render('create', {
    title: 'Добавить книгу'
  })
})

app.get('/update/:id', async (req: Request, res: Response) => {
  const repo = getBooksRepository()
  const book = await repo.getBook(String(req.params.id))

  if (!book) {
    return res.status(404).send('Книга не найдена')
  }

  res.render('update', {
    title: 'Редактировать книгу',
    book
  })
})

app.use(error404)

app.use(
  (
    err: Error,
    _req: Request,
    res: Response,
    _next: express.NextFunction
  ) => {
    console.error(err.stack)
    res.status(500).send({ error: err.message })
  }
)

const PORT = process.env.PORT || 3000

async function start(): Promise<void> {
  try {
    await connectToDatabase()

    app.listen(PORT, () => {
      console.log(`🚀 server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Не удалось подключиться к MongoDB:', error)
    process.exit(1)
  }
}

start()
