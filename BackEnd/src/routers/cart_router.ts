import {Router} from "express";
import CartController from "../controller/cart_controller";

export const cart_router = Router();
cart_router.get('/get-cart/:id',CartController.displayAnUserCart)
cart_router.post('/add',CartController.addProduct)
cart_router.delete('/remove-one',CartController.removeAProduct)
cart_router.delete('/remove-all',CartController.removeAllProduct)