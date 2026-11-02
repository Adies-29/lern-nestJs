import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "../../customers/entities/customer-entity.js";
import { OrderItem } from "./order-item.entity.js";
import { Payment } from "../../payments/entities/payment-entity.js";
import { Shipment } from "../../shipments/entities/shipment-entity.js";

@Entity('orders')
export class Order{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'uuid', name: 'customer_id'})
    customer_id:string;

    @Column({type: 'varchar', length: 50, unique:true, name:'order_number'})
    orderNumber:string;

    @Column({type:'varchar',length: 30, default:'pending'})
    status:string;

    @Column({type:'decimal', precision:12, scale:2, default:0, name: 'total_amount'})
    totalAmount:number;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type:'timestamp', name:'updated_at'})
    updatedAt: Date;

    @DeleteDateColumn({type:'timestamp', name: 'delete_at', nullable:true})
    deleteAt: Date;


    //relasi ke customer (banyak order bisa dimiliki 1 customer yang sama)
    @ManyToOne(() => Customer, (customer)=> customer.order)
    @JoinColumn({name: 'customer_id'})
    customer: Customer;

    //relasi ke order item  (1 order memiliki bnayak order_item)
    @OneToMany(() => OrderItem,(item) => item.order, {
        cascade: true,
    })
    items:OrderItem[];

    // relasi paymentx
    @OneToOne(() => Payment, (payment) => payment.order)
    payment:Payment[];
    
    // relasi shipment
    @OneToOne(() => Shipment, (shipment) => shipment.order)
    shipment: Shipment;
}
