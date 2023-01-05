import {Router} from "express";
import {product_router} from "./product_router";
import {user_router} from "./user_router";
import {cart_router} from "./cart_router";
import {category_router} from "./category_router";

export const router = Router();
router.use('/products',product_router);
router.use('/auth',user_router)
router.use('/cart',cart_router)
router.use('/category',category_router)