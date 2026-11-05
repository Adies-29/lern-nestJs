import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorsService } from './authors.service.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';

@Controller('authors')
export class AuthorsController {
  constructor(private authorService: AuthorsService) {}

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
  createBook(@Body() book: CreateAuthorDto) {
    //logic
    return this.authorService.create(book);
  }

  //update
  @Put(':id')
  update(@Param('id') id: string, @Body() book: CreateAuthorDto) {
    return this.authorService.update(id, book);
  }

  //hapus
  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.authorService.delete(id);
  }
}
