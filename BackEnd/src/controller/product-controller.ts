import ProductService from "../service/product-service";
import {Request, Response} from "express";

class ProductController {
    displayAll = async (req: Request, res: Response) => {
        let list = await ProductService.getAll()
        return res.status(200).json(list)
    }

    createProduct = async (req: Request, res: Response) => {
        let input = req.body
        let product = await ProductService.createProduct(input)
        return res.status(200).json(product)
    }

    updateInfo = async (req: Request, res: Response) => {
        let productId = req.params.id
        let input = req.body
        let product = await ProductService.updateInfo(productId,input)
        return res.status(200).json(product)
    }
}

export default new ProductController()