import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({type: "int"})
    public readonly id: number
    @Column({type: "varchar"})
    public username: string
    @Column({type: "varchar"})
    public password: string
    @Column({type: "varchar", default: ""})
    public phoneNumber: string
    @Column({type: "varchar", default: ""})
    public email: string
    @Column({type: "varchar", default: ""})
    public address: string
    @Column({type: "boolean", default: false})
    public readonly role: boolean //true: admin, false: user
}