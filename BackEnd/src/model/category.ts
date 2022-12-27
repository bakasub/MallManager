import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn({type: "int"})
    public readonly id: number
    @Column({type: "varchar"})
    public name: string
    @Column({type: "varchar"})
    public image: string
}