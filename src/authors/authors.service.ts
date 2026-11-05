import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author-entity.js';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto.js';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>
    ){}

    //tampilakan author
    async findAll():Promise<Author[]>{
            return await this.authorRepository.find({
                order:{createdAt:'DESC'}
            });
        } 
    //tampilakan data berdasrkan id
    async findOne(id: string): Promise<Author>{
            const author = await this.authorRepository.findOneBy({id});
    
            if(!author){
                throw new Error (`Author with id ${id} not found`);
            }
            return author;
        }
    //menambah data
    async create(author: CreateAuthorDto):Promise <Author>{
            const newAuthor = this.authorRepository.create(author)
            return await this.authorRepository.save(newAuthor);
        }
    //update data
     async update(id: string, author: CreateAuthorDto):Promise <Author>{
            const index = await this.findOne(id);
            const updateAuthor = this.authorRepository.merge(index, author);
            return await this.authorRepository.save(updateAuthor);
        }
    //hapus data
    async delete(id: string): Promise<{message: string, deleteId: string}>{
        await this.findOne(id);

        await this.authorRepository.softDelete(id);
        return {
            message:'author dihapus',
            deleteId:id
        }
    }
}
