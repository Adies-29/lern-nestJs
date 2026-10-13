import { Controller, Get, Param, Post, Body, Delete,Put } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book-dto.js';


@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService){

    }

    //menampilkan data
    @Get()
    getAllBooks(){
        return this.bookService.findAll();
    }
    
    // menampilkan data berdasarkan id
    @Get(':id')
    getBookById(@Param('id') id:string){
        //logic
        return this.bookService.findOne(Number(id));
    }

    //simpan data
    @Post()
    createBook(@Body() book: CreateBookDto){
        //logic
        return this.bookService.create(book);   
    }

    @Put(':id')
    update(
    @Param('id') id: string,
    @Body() book: CreateBookDto){
        return this.bookService.update(Number(id), book)
    }
       
    @Delete(':id')
    deleteBook(@Param('id') id:string){
        return this.bookService.delete(Number(id));

    }



}
