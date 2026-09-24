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
    const { title, description, authors, favorite, fileCover, fileName } = updatedBook

    return Book.findOneAndUpdate(
      { id },
      {
        $set: {
          title,
          description,
          authors,
          favorite,
          fileCover,
          fileName
        }
      },
      { new: true, runValidators: true }
    )
  }

  async deleteBook(id) {
    return Book.findOneAndDelete({ id })
  }
}

module.exports = BooksRepository
