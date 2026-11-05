import { Column, CreateDateColumn, type Relation, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../../categories/entities/category-entity.js";
import { Publisher } from "../../publishers/entities/publisher-entity.js";
import { OrderItem } from "../../orders/entities/order-item.entity.js";

@Entity('books')
export class Book{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length:64})
    name:string;

    @Column({type: 'varchar', length:64})
    author:string;

    @Column({type: 'varchar'})
    isbn:string;

    @Column({type: 'int'})
    publishedYear:number;

    @Column({type: 'boolean', default:true})
    isAvailable:boolean;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type:'timestamp', name:'updated_at'})
    updatedAt: Date;

    @DeleteDateColumn({type:'timestamp', name: 'delete_at', nullable:true})
    deleteAt: Date;

    // Relasi: Banyak Books dimiliki oleh 1 Category
    @ManyToOne('Category', (category: any) => category.books)
    @JoinColumn({ name: 'category_id' })
    category: Relation<Category>;

    //reslasi publisher
    @ManyToOne(()=> Publisher, (publisher)=> publisher.books)
    @JoinColumn({name:'publisher_id'})
    publisher:Publisher;

    // relasi book_author

    //relasi order_items
    @OneToMany('OrderItem', (item: any) => item.book)
    orderItems: Relation<OrderItem[]>;
}
