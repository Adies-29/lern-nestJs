import { Injectable } from '@nestjs/common';
import { Book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book-dto.js';

@Injectable()
export class BooksService {
    private books: Book[] = [
        {
        id: 1,
        name: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        isbn: '978-0132350884',
        publishedYear: 2008,
        isAvailable: true,
        },
        {
        id: 2,
        name: 'Designing Data-Intensive Applications',
        author: 'Martin Kleppmann',
        isbn: '978-1449373320',
        publishedYear: 2017,
        isAvailable: true,
        },
        {
        id: 3,
        name: 'Domain-Driven Design: Tackling Complexity in Software',
        author: 'Eric Evans',
        isbn: '978-0321125217',
        publishedYear: 2003,
        isAvailable: false,
        },
    ]

    //find all
    findAll():Book[]{
        return this.books;
    } 
    //getById
    findOne(id: number): Book | undefined{
        return this.books.find(book => book.id === id);
    }
    //
    create(book: CreateBookDto): Book{
        const newBook: Book = {
            id: this.books.length + 1,
            name: book.name,
            author: book.author,
            isbn: book.isbn,
            publishedYear: book.publishedYear,
            isAvailable: true, // Default buku baru tersedia
        };

        this.books.push(newBook);
        return newBook;
    }

    update(id: number, book: CreateBookDto): Book | undefined {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            return undefined;
        }

        this.books[bookIndex] = { ...this.books[bookIndex], ...book };
        return this.books[bookIndex];
    }

    delete(id: number): boolean{
        const index = this.books.findIndex(b =>b.id === id);
        if(index !== 1){
            this.books.splice(index,1 );
            return true;
        }
        return false;
    }
}
