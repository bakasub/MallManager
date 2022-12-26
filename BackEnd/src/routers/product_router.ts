import {Router} from "express";
import product_controller from "../controller/product_controller";

export const product_router = Router();
product_router.get('',product_controller.getAll);
product_router.post('/add', product_controller.add);
product_router.put('/:id',product_controller.edit);
product_router.delete('/:id',product_controller.delete);
product_router.get('/find-by-name',product_controller.finByName);