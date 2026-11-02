import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../orders/entities/order-entity.js";
import { IsUUID } from "class-validator";

@Entity('shipments')
export class Shipment{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @IsUUID('4', { message: 'Order ID harus berupa UUID valid!' })
    @Column({type:'uuid', name:'order_id'})
    orderId:string

    @Column({type:'varchar', length:100,})
    courier:string;

    @Column({type:'varchar',length:100, nullable:true, name:'tracking_numberr'})
    trackingNumber:string;

    @Column({type:'varchar',length:30})
    status:string;

    @Column({type:'timestamp',name:'shipped_at', nullable:true})
    shippedAt:Date;

    @Column({type:'timestamp',name:'delivered_at', nullable:true})
    deliveredAt:Date;

    @OneToOne(() => Order)
    @JoinColumn({name:'order_id'})
    order:Order

}