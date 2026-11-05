import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PublishersService } from './publishers.service.js';
import { CreatePublisherDto } from './dto/create-publisher.js';

@Controller('publishers')
export class PublishersController {
    constructor(private authorService: PublishersService) {}
    
      //tampilkan semua
      @Get()
      getAllAuthor() {
        return this.authorService.findAll();
      }
      //tampilkan berdasarkan id
      @Get(':id')
      getBookById(@Param('id') id: string) {
        //logic
        return this.authorService.findOne(id);
      }
    
      //simpan
      @Post()
      createBook(@Body() book: CreatePublisherDto) {
        //logic
        return this.authorService.create(book);
      }
    
      //update
      @Put(':id')
      update(@Param('id') id: string, @Body() book: CreatePublisherDto) {
        return this.authorService.update(id, book);
      }
    
      //hapus
      @Delete(':id')
      deleteBook(@Param('id') id: string) {
        return this.authorService.delete(id);
      }
}
