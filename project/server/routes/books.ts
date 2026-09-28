import { Router } from 'express'
import type { Request, Response } from 'express'
import fileMulter from '../middleware/file'
import container from '../container'
import BooksRepository from '../models/books-repository'
import type { Book } from '../models/book.interface'

const router = Router()

// получаем весь массив
router.get('/', async (_req: Request, res: Response) => {
  const repo = container.get(BooksRepository)
  const books = await repo.getBooks()
  res.json(books)
})

// получаем книгу по id
router.get('/:id', async (req: Request, res: Response) => {
  const repo = container.get(BooksRepository)
  const book = await repo.getBook(String(req.params.id))

  if (!book) {
    return res.status(404).json('404 | не найдено')
  }

  res.json(book)
})

// добавление книги
router.post('/', async (req: Request, res: Response) => {
  const repo = container.get(BooksRepository)
  const book = await repo.createBook(req.body)
  res.status(201).json(book)
})

// обновление записи полностью
router.put('/:id', async (req: Request, res: Response) => {
  const repo = container.get(BooksRepository)
  const book = await repo.updateBook(String(req.params.id), req.body)

  if (!book) {
    return res.status(404).json('404 | не найдено')
  }

  res.json(book)
})

// обновление записи частично
router.patch('/:id', async (req: Request, res: Response) => {
  const repo = container.get(BooksRepository)
  const book = await repo.patchBook(String(req.params.id), req.body)

  if (!book) {
    return res.status(404).json('404 | не найдено')
  }

  res.json(book)
})

// удаляем запись по айди
router.delete('/:id', async (req: Request, res: Response) => {
  const repo = container.get(BooksRepository)
  const book = await repo.deleteBook(String(req.params.id))

  if (!book) {
    return res.status(404).json('404 | не найдено')
  }

  res.json('ok')
})

// добавляем файл
router.post(
  '/:id/upload',
  fileMulter.single('book-file'),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json('Файл не загружен')
    }

    const repo = container.get(BooksRepository)
    const book = await repo.patchBook(String(req.params.id), {
      fileBook: req.file.path
    })

    if (!book) {
      return res.status(404).json('404 | книга не найдена')
    }

    if (req.get('accept')?.includes('text/html')) {
      return res.redirect(`/books/${book.id}`)
    }

    res.json(book)
  }
)

// отдаем файл пользователю
router.get('/:id/download', async (req: Request, res: Response) => {
  const repo = container.get(BooksRepository)
  const book = await repo.getBook(String(req.params.id))

  if (!book) {
    return res.status(404).json('404 | книга не найдена')
  }

  if (!book.fileBook) {
    return res.status(404).json('404 | файл отсутствует')
  }

  res.download(book.fileBook)
})

export default router
