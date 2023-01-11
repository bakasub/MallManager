import {Router} from "express";
import OrderController from "../controller/order_controller";

export const order_router = Router();
order_router.get('/all',OrderController.displayAllOrder)
order_router.get('/user/:user',OrderController.displayAnUserOrders)
order_router.get('/an-order/:order',OrderController.displayAnOrderDetails)
order_router.get('/confirmed-orders/:user',OrderController.displayUserConfirmedOrders)
order_router.post('/create-order',OrderController.createOrder)
order_router.put('/cancel-order/:order',OrderController.cancelOrder)
order_router.put('/confirm-order/:order',OrderController.confirmOrder)
