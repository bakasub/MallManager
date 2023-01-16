import {AppDataSource} from "../data-source";
import {Category} from "../model/category";

export class CategoryService{
    private categoryRepository:any
    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category)
    }
    findAll=async() => {
        let categories = await this.categoryRepository.find();
        return categories
    }
}