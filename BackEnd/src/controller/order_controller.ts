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
            let userId = req.params.user
            let list = await OrderService.getAnUserOrders(userId)
            return res.status(200).json(list)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    createOrder = async (req: Request, res: Response) => {
        try {
            let userId = req.body
            let result = await OrderService.createOrder(userId)
            return res.status(200).json(result)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    cancelOrder = async (req: Request, res: Response) => {
        try {
            let orderId = req.params.order
            let result = await OrderService.cancelOrder(orderId)
            return res.status(200).json(result)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    displayAnOrderDetails = async (req: Request, res: Response) => {
        try {
            let orderId = req.params.order
            let result = await OrderService.getAnOrderDetails(orderId)
            return res.status(200).json(result)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    confirmOrder = async (req: Request, res: Response) => {
        try {
            let orderId = req.params.order
            let result = await OrderService.confirmOrder(orderId)
            return res.status(200).json(result)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }

    displayUserConfirmedOrders = async (req: Request, res: Response) => {
        try {
            let userId = req.params.user
            let result = await OrderService.getUserConfirmedOrders(userId)
            return res.status(200).json(result)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }
    }
}

export default new OrderController()