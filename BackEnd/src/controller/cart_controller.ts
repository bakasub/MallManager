import {Request, Response} from "express";
import CartService from "../service/cart_service";

class CartController {
    displayAnUserCart = async (req: Request, res: Response) => {
        let userId = +req.params.user_id
        let result = await CartService.getAnUserCart(userId)
        return res.status(200).json(result)
    }

    addProduct = async (req: Request, res: Response) => {
        let input = req.body
        let result = await CartService.addProduct(input)
        return res.status(200).json(result)
    }
}

export default new CartController