"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const category_1 = require("../model/category");
class CategoryService {
    constructor() {
        this.findAll = async () => {
            let categories = await this.categoryRepository.find();
            return categories;
        };
        this.filterByCategoryId = async (input) => {
            let query = `select *, c.category_name from products as p join category c on p.category_id = c.category_id where p.category_id = ${input}`;
            let result = await this.categoryRepository.query(query);
            return result;
        };
        this.createCate = async (input) => {
            let result = await this.categoryRepository.save(input);
            return result;
        };
        this.categoryRepository = data_source_1.AppDataSource.getRepository(category_1.Category);
    }
}
exports.default = new CategoryService();
//# sourceMappingURL=category_service.js.map