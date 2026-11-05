import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, type Relation, } from "typeorm";
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


   // Gunakan string 'Customer' dan Relation<Customer>
  @ManyToOne('Customer', (customer: any) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Relation<Customer>;

  @OneToMany('OrderItem', (item: any) => item.order, { cascade: true })
  items: Relation<OrderItem[]>;

  @OneToOne('Payment', (payment: any) => payment.order)
  payment: Relation<Payment>;

  @OneToOne('Shipment', (shipment: any) => shipment.order)
  shipment: Relation<Shipment>;
}
