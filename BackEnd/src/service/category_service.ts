import {AppDataSource} from "../data-source";
import {Category} from "../model/category";

class CategoryService {
    private categoryRepository: any

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category)
    }

    findAll = async () => {
        let categories = await this.categoryRepository.find();
        return categories
    }

    filterByCategoryId = async (input) => {
        let query = `select *, c.category_name from products as p join category c on p.category_id = c.category_id where p.category_id = ${input}`
        let result = await this.categoryRepository.query(query)
        return result
    }

    createCate = async (input) => {
        let result = await this.categoryRepository.save(input)
        return result
    }
}

export default new CategoryService()