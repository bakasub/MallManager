import {Router} from "express";
import Category_controller from "../controller/category_controller";

export const category_router = Router()
category_router.get('/all',Category_controller.displayCategoryList)
category_router.get('/filter-by-cate/:id',Category_controller.filterByCategory)
category_router.post('/create',Category_controller.createCategory)