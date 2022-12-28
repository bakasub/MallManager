import {Router} from "express";
import ProductController from "../controller/product-controller";

export const productRouter = Router();
productRouter.get('/all',ProductController.displayAll);
productRouter.get('/one/:id',ProductController.displayOne);
productRouter.post('/create',ProductController.createProduct);
productRouter.put('/update/:id',ProductController.updateInfo);
productRouter.delete('/delete/:id',ProductController.removeProduct);
