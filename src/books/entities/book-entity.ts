import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({type: 'int', length:64})
    publishedYear:number;

    @Column({type: 'boolean', default:true})
    isAvailable:boolean;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type:'timestamp', name:'updated_ar'})
    upadatedAt: Date;

    @DeleteDateColumn({type:'timestamp', name: 'delete_at', nullable:true})
    deleteAt: Date;
}
