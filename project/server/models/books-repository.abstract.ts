import type { Book } from "./book.interface";

abstract class BooksRepository {
    abstract createBook(book: Partial<Book>): Promise<Book>;
    abstract getBook(id: string): Promise<Book | null>;
    abstract getBooks(): Promise<Book[]>;
    abstract updateBook(id: string, updatedBook: Book): Promise<Book | null>;
    abstract patchBook(id: string, updatedBook: Partial<Book>): Promise<Book | null>;
    abstract deleteBook(id: string): Promise<Book | null>;
}

export = BooksRepository;
