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
        let products = await this.productRepository.query(`select * from products where name_product like '%${name_product}%'`)
        return products
    }
    add = async (product)=>{
        let products = await this.productRepository.save(product)
        return products
    }
    edit = async (product_id,product)=>{
        let products= await this.productRepository.update(product_id,product);
        return products
    }
    delete = async (productId:number)=>{
        let products =await this.productRepository.delete(productId);
        return products
    }
}

export default new ProductService();