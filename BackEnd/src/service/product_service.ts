import {AppDataSource} from "../data-source";
import {Request, Response} from "express";
import {Product} from "../model/product";


export class ProductService{
    private productRepository: any;
    constructor() {
        AppDataSource.initialize().then(connection=>{
            console.log('Connect Database Success!')
            this.productRepository = connection.getRepository(Product);
        })
        this.productRepository= AppDataSource.getRepository(Product);
    }
    findAll = async ()=>{
        let products = await this.productRepository.find();
        return products
    }
    findByName = async (name_product)=>{
        let products = await this.productRepository.query(`select * from posts where name_product like '%${name_product}%'`)
        return products
    }
    add = async (req:Request,res:Response)=>{
        let product = req.body;
        let products = await this.productRepository.save(product)
        return products
    }
    edit = async (req:Request,res:Response)=>{
        let id= +req.params.product_id;
        let product = req.body;
        let products= await this.productRepository.update({product_id:id},product);
        return products
    }
    delete = async (req:Request,res:Response)=>{
        let id= +req.params.product_id;
        let products =await this.productRepository.delete(id);
        return products
    }
}

export default new ProductService();
