import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:'carts'})
export class Cart {
    @PrimaryGeneratedColumn({type: 'int'})
    public index: number
    @Column({type:'int'})
    public user_id: number
    @Column({type:'int'})
    public product_id: number
    @Column({type:'int'})
    public quantity: number
}