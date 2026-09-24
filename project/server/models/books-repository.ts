import type { Book } from "./book";

abstract class BooksRepository {
    abstract createBook(book: Book): Promise<Book>;
    abstract getBook(id: string): Promise<Book | null>;
    abstract getBooks(): Promise<Book[]>;
    abstract updateBook(id: string, updatedBook: Book): Promise<Book | null>;
    abstract deleteBook(id: string): Promise<Book | null>;
}

export = BooksRepository;
