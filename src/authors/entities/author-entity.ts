import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('authors')
export class Author{
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
}
