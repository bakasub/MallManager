import {Request, Response} from "express";
import {ProductService} from "../service/product_service";

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    getAll = async (req: Request, res: Response) => {
        try {
            let products = await this.productService.findAll();
            return res.status(200).json(products);
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    findByName = async (req: Request, res: Response) => {
        try {
            let product = req.query;
            let productFind = await this.productService.findByName(product.name_product);
            return res.status(201).json(productFind)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    add = async (req: Request, res: Response) => {
        try {
            let product = req.body;
            let products = await this.productService.add(product);
            return res.status(200).json(products);
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    edit = async (req: Request, res: Response) => {
        try {
            let products = await this.productService.edit(req.params.product_id, req.body);
            return res.status(200).json(products);
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            let products = await this.productService.delete(+req.params.product_id);
            return res.status(200).json(products)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    advancedFilter = async (req: Request, res: Response) => {
        try {
            let input = req.query
            let result = await this.productService.advancedFilter(input);
            return res.status(200).json(result)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
}

export default new ProductController();