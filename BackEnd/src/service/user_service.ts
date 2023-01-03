import {AppDataSource} from "../data-source";
import {User} from "../model/user";
import { Request, Response} from "express";

export class UserService{
    private userRepository:any;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    findAll = async ()=>{
        let users = await this.userRepository.find();
        return users
    }
    login = async (username)=>{
        let users = await this.userRepository.query(`select * from users where username = '${username}'`)
        return users
    }
    findByName = async (username)=>{
        let users = await this.userRepository.query(`select * from users where username = '%${username}%'`)
        return users
    }
    add = async (user)=>{
        let users = await this.userRepository.save(user)
        return users
    }
    edit = async (req:Request,res:Response)=>{
        let id= +req.params.user_id;
        let users = req.body;
        return  await this.userRepository.update({user_id:id},users);
    }
    delete = async (req:Request,res:Response)=>{
        let id= +req.params.id;
        let users =await this.userRepository.delete(id);
        return users
    }
}