import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../orders/entities/order-entity.js";
import { IsUUID } from "class-validator";

@Entity('payments')
export class Payment{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @IsUUID('4', { message: 'Order ID harus berupa UUID valid!' })
    @Column({type:'uuid', name:'order_id'})
    orderId:string

    @Column({type:'varchar', length:50, name: 'payment_method'})
    paymentMethod:string;

    @Column({type:'decimal',precision:12, scale:2})
    amount:string;

    @Column({type:'varchar',length:30})
    status:string;

    @Column({type:'timestamp', name:'paid_at', nullable:true})
    paidAt:Date;

    @Column({type:'timestamp', name:'created_at'})
    createdAt:Date;

    //relasi Order
    @OneToOne(() => Order, (order) => order.payment)
    @JoinColumn({name:'order_id'})
    order:Order;

}