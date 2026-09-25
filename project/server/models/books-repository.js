const Book = require('./book')

class BooksRepository {
  async getBooks() {
    return Book.find()
  }

  async getBook(id) {
    return Book.findOne({ id })
  }

  async createBook(book) {
    return Book.create(book)
  }

  async updateBook(id, updatedBook) {
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

  async patchBook(id, updatedBook) {
    const fields = {}
    const allowedFields = [
      'title',
      'description',
      'authors',
      'favorite',
      'fileCover',
      'fileName',
      'fileBook'
    ]

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

  async deleteBook(id) {
    return Book.findOneAndDelete({ id })
  }
}

module.exports = BooksRepository
