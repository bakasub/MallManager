import {Request, Response} from "express";
import Category_service from "../service/category_service";

class CategoryController {
    displayCategoryList = async (req: Request, res: Response) => {
        try {
            let list = await Category_service.findAll()
            return res.status(200).json(list)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }

    }

    filterByCategory = async (req: Request, res: Response) => {
        try {
            let input = +req.params.id
            let result = await Category_service.filterByCategoryId(input)
            return res.status(200).json(result)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }

    }

    createCategory = async (req: Request, res: Response) => {
        try {
            let input = req.body
            let result = await Category_service.createCate(input)
            return res.status(200).json(result)
        } catch (e) {
            res.json({
                mess: e.message
            })
        }

    }
}

export default new CategoryController()