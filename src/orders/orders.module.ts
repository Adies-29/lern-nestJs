import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
import { Order } from './entities/order-entity.js';
import { OrderItem } from './entities/order-item.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../books/entities/book-entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Book])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
