import { Injectable } from '@nestjs/common';
import { Publisher } from './entities/publisher-entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePublisherDto } from './dto/create-publisher.js';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  //tampilakan author
  async findAll(): Promise<Publisher[]> {
    return await this.publisherRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
  //tampilakan data berdasrkan id
  async findOne(id: string): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOneBy({ id });

    if (!publisher) {
      throw new Error(`Author with id ${id} not found`);
    }
    return publisher;
  }

  //menambah data
  async create(publisher: CreatePublisherDto): Promise<Publisher> {
    const newPublisher = this.publisherRepository.create(publisher);
    return await this.publisherRepository.save(newPublisher);
  }

  //update data
  async update(id: string, author: CreatePublisherDto): Promise<Publisher> {
    const index = await this.findOne(id);
    const updatePublisher = this.publisherRepository.merge(index, author);
    return await this.publisherRepository.save(updatePublisher);
  }

  //hapus data
  async delete(id: string): Promise<{ message: string; deleteId: string }> {
    await this.findOne(id);

    await this.publisherRepository.softDelete(id);
    return {
      message: 'publisher dihapus',
      deleteId: id,
    };
  }
}
