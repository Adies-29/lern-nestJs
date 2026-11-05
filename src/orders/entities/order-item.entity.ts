import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, type Relation, } from "typeorm";
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
    @ManyToOne('Order', (order: any) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Relation<Order>;

  // Gunakan string 'Book' dan tipe Relation<Book>
  @ManyToOne('Book', (book: any) => book.orderItems)
  @JoinColumn({ name: 'book_id' })
  book: Relation<Book>;

}