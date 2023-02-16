import {Router} from "express";
import {product_router} from "./product_router";
import {user_router} from "./user_router";
import {cart_router} from "./cart_router";
import {order_router} from "./order_router";

export const router = Router();
router.use('/product',product_router);
router.use('/auth',user_router);
router.use('/cart',cart_router);
router.use('/order',order_router);
