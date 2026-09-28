import mongoose from 'mongoose'
import { v4 as uuid } from 'uuid'

const bookSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => uuid()
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    authors: {
      type: String,
      default: ''
    },
    favorite: {
      type: String,
      default: ''
    },
    fileCover: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      default: ''
    },
    fileBook: {
      type: String,
      default: ''
    }
  },
  {
    collection: 'books'
  }
)

const Book = mongoose.model('Book', bookSchema)

export default Book
