import {Router} from "express";
import CartController from "../controller/cart_controller";

export const cart_router = Router();
cart_router.get('/get-cart/:user_id',CartController.displayAnUserCart)
cart_router.post('/add',CartController.addProduct)