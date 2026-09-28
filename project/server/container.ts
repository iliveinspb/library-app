import { Container } from 'inversify'
import BooksRepository from './models/books-repository'

const container = new Container()

container.bind(BooksRepository).toSelf()

export default container
