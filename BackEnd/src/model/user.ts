import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:'users'})
export class User{
    @PrimaryGeneratedColumn({type:'int'})
    public readonly user_id: number;
    @Column({type:'varchar'})
    public username: string;
    @Column({type: 'varchar'})
    public password: string;
    @Column({type:'varchar'})
    public phone:string;
    @Column({type:'varchar'})
    public email:string;
    @Column({type:'varchar'})
    public address:string
    @Column({type: 'int', default: 1}) // 1: user; 2: admin
    public role: string;
}