import {Router} from "express";
import ProductController from "../controller/product-controller";

export const productRouter = Router();
productRouter.get('/all',ProductController.displayAll);
productRouter.post('/create',ProductController.createProduct);
productRouter.put('/update/:id',ProductController.updateInfo);