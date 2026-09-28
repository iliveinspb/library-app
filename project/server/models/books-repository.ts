import Book from './book'
import { decorate, injectable } from 'inversify'
import AbstractBooksRepository from './books-repository.abstract'
import type { Book as BookType } from './book.interface'

class BooksRepository extends AbstractBooksRepository {
  async getBooks() {
    return Book.find()
  }

  async getBook(id: string) {
    return Book.findOne({ id })
  }

  async createBook(book: Partial<BookType>) {
    return Book.create(book)
  }

  async updateBook(id: string, updatedBook: BookType) {
    const {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    } = updatedBook

    return Book.findOneAndUpdate(
      { id },
      {
        $set: {
          title,
          description,
          authors,
          favorite,
          fileCover,
          fileName,
          fileBook
        }
      },
      { new: true, runValidators: true }
    )
  }

  async patchBook(id: string, updatedBook: Partial<BookType>) {
    const fields: Record<string, unknown> = {}
    const allowedFields = [
      'title',
      'description',
      'authors',
      'favorite',
      'fileCover',
      'fileName',
      'fileBook'
    ] as const

    allowedFields.forEach((field) => {
      if (updatedBook[field] !== undefined) {
        fields[field] = updatedBook[field]
      }
    })

    return Book.findOneAndUpdate(
      { id },
      { $set: fields },
      { new: true, runValidators: true }
    )
  }

  async deleteBook(id: string) {
    return Book.findOneAndDelete({ id })
  }
}

decorate(injectable(), BooksRepository)

export = BooksRepository
