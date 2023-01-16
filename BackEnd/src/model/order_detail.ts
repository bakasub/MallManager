import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "orderdetail"})
export class OrderDetail {
    @PrimaryGeneratedColumn({type: 'int'})
    public index: number
    @Column({type:'int'})
    public order_id
    @Column({type: 'int'})
    public user_id: number
    @Column({type:"int"})
    public product_id: number
    @Column({type:'int'})
    public productQuantity: number
}