"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = __importDefault(require("../service/category_service"));
class CategoryController {
    constructor() {
        this.displayCategoryList = async (req, res) => {
            let list = await category_service_1.default.findAll();
            return res.status(200).json(list);
        };
        this.filterByCategory = async (req, res) => {
            let input = +req.params.id;
            let result = await category_service_1.default.filterByCategoryId(input);
            return res.status(200).json(result);
        };
        this.createCategory = async (req, res) => {
            let input = req.body;
            let result = await category_service_1.default.createCate(input);
            return res.status(200).json(result);
        };
    }
}
exports.default = new CategoryController();
//# sourceMappingURL=category_controller.js.map