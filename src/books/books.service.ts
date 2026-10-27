import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book-dto.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ){}

    //find all
    async findAll():Promise<Book[]>{
        return await this.bookRepository.find({
            order:{createdAt:'DESC'}
        });
    } 

    //getById
    async findOne(id: string): Promise<Book>{
        const book = await this.bookRepository.findOneBy({id});

        if(!book){
            throw new NotFoundException('Loh')
        }
        return book;
    }
    //
    async create(book: CreateBookDto):Promise <Book>{
        const newBook = this.bookRepository.create(book)
        return await this.bookRepository.save(newBook);
    }

    async update(id: string, book: CreateBookDto):Promise <Book>{
        const index = await this.findOne(id);
        const updateBook = this.bookRepository.merge(index, book);
        return await this.bookRepository.save(updateBook);
    }

    async delete(id: string): Promise<{message: string, deleteId: string}>{
        await this.findOne(id);

        await this.bookRepository.softDelete(id);
        return {
            message:'Buku dihapus',
            deleteId:id
        }
    }
}
