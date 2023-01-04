import {Request, Response} from "express";
import {ProductService} from "../service/product_service";

export class ProductController {
    private productService: ProductService

    constructor() {
        this.productService = new ProductService();
    }

    getAll = async (req: Request, res: Response) => {
        let products = await this.productService.findAll();
        return res.status(200).json(products);
    }
    finByName = async (req: Request, res: Response) => {
        let product = req.query;
        let productFind = await this.productService.findByName(product.name_product);
        return res.status(201).json(productFind)
    }
    add = async (req: Request, res: Response) => {
        let product = req.body;
        let products = await this.productService.add(product);
        return res.status(200).json(products);
    }

    edit = async (req: Request, res: Response) => {
        let products = await this.productService.edit(req.params.product_id, req.body);
        return res.status(200).json(products);
    }
    delete = async (req: Request, res: Response) => {
        let products = await this.productService.delete(+req.params.product_id);
        return res.status(200).json(products)
    }
}

export default new ProductController();