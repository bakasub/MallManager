"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const data_source_1 = require("../data-source");
const category_1 = require("../model/category");
class CategoryService {
    constructor() {
        this.findAll = async () => {
            let categories = await this.categoryRepository.find();
            return categories;
        };
        this.categoryRepository = data_source_1.AppDataSource.getRepository(category_1.Category);
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category_service.js.map