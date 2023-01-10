import {Request, Response} from "express";
import OrderService from "../service/order_service";

class OrderController {
    displayAllOrder = async (req: Request, res: Response) => {
        try {
            let list = await OrderService.getListOrders()
            return res.status(200).json(list)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }

    }

    displayAnUserOrders = async (req: Request, res: Response) => {
        try {
            let userId = req.params.id
            let list = await OrderService.getAnUserOrders(userId)
            return res.status(200).json
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }


}

export default new OrderController()