import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order-entity.js";
import { Book } from "../../books/entities/book-entity.js";

@Entity('order_items')
export class OrderItem{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'uuid', name:'order_id'})
    orderId:string;

    @Column({type:'uuid', name: 'book_id'})
    bookId:string;

    @Column({type:'int'})
    quantity:number;

    @Column({type:'decimal', precision: 12, scale:2})
    price:number;

    @Column({type:'decimal', precision:12, scale:2})
    subtotal:number;

    //relasi ke order
    @ManyToOne(() => Order, (order) => order.items, {onDelete: 'CASCADE'})
    @JoinColumn({name:'order_id'})
    order:Order

    //relasi ke book 
    @ManyToOne(() => Book, (book) => book.orderitem)
    @JoinColumn({name: 'book_id'})
    book: Book

}