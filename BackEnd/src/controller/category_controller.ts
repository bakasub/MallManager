import {Request, Response} from "express";
import Category_service from "../service/category_service";

class CategoryController {
    displayCategoryList = async (req: Request, res: Response) => {
        let list = await Category_service.findAll()
        return res.status(200).json(list)
    }

    filterByCategory = async (req: Request, res: Response) => {
        let input = +req.params.id
        let result = await Category_service.filterByCategoryId(input)
        return res.status(200).json(result)
    }

    createCategory = async (req: Request, res: Response) => {
        let input = req.body
        let result = await Category_service.createCate(input)
        return res.status(200).json(result)
    }
}

export default new CategoryController()