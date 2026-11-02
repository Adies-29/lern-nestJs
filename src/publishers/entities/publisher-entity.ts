import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Book } from "../../books/entities/book-entity.js";

@Entity('publishers')
export class Publisher{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length:64})
    name:string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type:'timestamp', name:'updated_at'})
    updatedAt: Date;

    @DeleteDateColumn({type:'timestamp', name: 'delete_at', nullable:true})
    deleteAt: Date;

    @OneToMany(() => Book, (book) => book.publisher)
    books:Book[];
}
