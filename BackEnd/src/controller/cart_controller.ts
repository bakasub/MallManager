import {Request, Response} from "express";
import CartService from "../service/cart_service";

class CartController {
    displayAnUserCart = async (req: Request, res: Response) => {
        let userId = +req.params.id
        let result = await CartService.getAnUserCart(userId)
        return res.status(200).json(result)
    }

    addProduct = async (req: Request, res: Response) => {
        let input = req.body
        let result = await CartService.addProduct(input)
        return res.status(200).json(result)
    }

    removeAProduct = async (req:Request, res:Response) => {
        let input = req.query
        await CartService.removeAProduct(input)
        return res.status(200).json({message:"Removed!"})
    }

    removeAllProduct = async (req: Request, res: Response) => {
        let input = req.body
        await CartService.removeAllProduct(input)
        return res.status(200).json({message: "Cleared your cart"})
    }

    decreaseQuantity = async (req: Request, res: Response) => {
        try {
            let input = req.body
            let result = await CartService.decreaseQuantity(input)
            return res.status(200).json(result)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    increaseQuantity = async (req: Request, res: Response) => {
        try {
            let input = req.body
            let result = await CartService.increaseQuantity(input)
            console.log(result)
            return res.status(200).json(result)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
}

export default new CartController