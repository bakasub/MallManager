import {Router} from "express";
import CartController from "../controller/cart_controller";

export const cart_router = Router();
cart_router.get('/get-cart/:user_id',CartController.displayAnUserCart)
cart_router.post('/add',CartController.addProduct)
cart_router.post('/decrease-quantity',CartController.decreaseQuantity)
cart_router.post('/increase-quantity',CartController.increaseQuantity)
cart_router.delete('/remove-one',CartController.removeAProduct)
cart_router.delete('/remove-all',CartController.removeAllProduct)