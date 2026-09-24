import type { Book } from "./book";

abstract class BooksRepository {
    abstract createBook(book: Book): void;
    abstract getBook(id: string): Book | null;
    abstract getBooks(): Book[];
    abstract updateBook(id: string, updatedBook: Book): void;
    abstract deleteBook(id: string): void;
}