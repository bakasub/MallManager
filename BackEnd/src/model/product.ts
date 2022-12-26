import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:'products'})
export class Product{
    @PrimaryGeneratedColumn({type:'int'})
    public readonly product_id: number;
    @Column({type:'int'})
    public user_id: number;
    @Column({type:'varchar'})
    public name_product: string;
    @Column({type:'varchar'})
    public price: string;
    @Column({type:'varchar'})
    public quantity: string;
    @Column({type:'int'})
    public status: number;
    @Column({type:'varchar'})
    public url: string;
    @Column({type:'varchar'})
    public description:string;
}