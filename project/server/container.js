const { Container } = require('inversify')
const BooksRepository = require('./models/books-repository')

const container = new Container()

container.bind(BooksRepository).toSelf()

module.exports = container
