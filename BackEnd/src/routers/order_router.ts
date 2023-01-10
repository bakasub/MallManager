import {Router} from "express";
import OrderController from "../controller/order_controller";

export const order_router = Router();
order_router.get('/all',OrderController.displayAllOrder)
order_router.get('/user/:id',OrderController.displayAnUserOrders)