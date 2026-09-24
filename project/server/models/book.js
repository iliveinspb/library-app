const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const bookSchema = new mongoose.Schema({
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
  }
}, {
  collection: 'books'
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
