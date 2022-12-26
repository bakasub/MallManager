
import {Request, Response} from "express";
import  {ProductService} from "../service/product_service";

export class ProductController{
    private productService: ProductService
    constructor() {
        this.productService= new ProductService();
    }
    getAll = async (req:Request,res:Response)=>{
        let products = await this.productService.findAll();
        return res.status(200).json(products);
    }
    finByName =async (req:Request,res:Response)=>{
        let product = req.body;
        let productFind = await this.productService.findByName(product.product_name);
        return res.status(201).json(productFind)
    }
    add = async (req:Request,res:Response)=>{
        let products= await this.productService.add(req,res);
        return res.status(200).json(products);
    }

    edit = async  (req:Request,res:Response)=>{
        let products =  await this.productService.edit(req,res);
        return res.status(200).json(products);
    }
    delete= async  (req:Request,res:Response)=>{
        let products= await this.productService.delete(req,res);
        return res.status(200).json(products)
    }
}
export default new ProductController();