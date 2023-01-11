import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "orders"})
export class Order {
    @PrimaryGeneratedColumn({type: 'int'})
    public order_id: number
    @Column({type: 'int'})
    public user_id: number
    @Column({type: 'int', default: 1}) //1: pending, 2: approved, 3: denied
    public status: number
}