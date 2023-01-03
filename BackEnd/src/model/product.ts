import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:'products'})
export class Product{
    @PrimaryGeneratedColumn({type:'int'})
    public readonly product_id: number;
    @Column({type:'int',default:1})
    public user_id: number;
    @Column({type:'varchar'})
    public name_product: string;
    @Column({type:'int'})
    public price: number;
    @Column({type:'int'})
    public quantity: number;
    @Column({type:'varchar',default:""})
    public url: string;
    @Column({type:'varchar'})
    public description:string;
    @Column({type:'int'})
    public category_id: number;
}