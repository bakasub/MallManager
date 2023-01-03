"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../service/product_service");
const category_service_1 = require("../service/category_service");
class ProductController {
    constructor() {
        this.getAll = async (req, res) => {
            let products = await this.productService.findAll();
            return res.status(200).json(products);
        };
        this.finByName = async (req, res) => {
            let product = req.query;
            let productFind = await this.productService.findByName(product.name_product);
            return res.status(201).json(productFind);
        };
        this.add = async (req, res) => {
            let product = req.body;
            let products = await this.productService.add(product);
            return res.status(200).json(products);
        };
        this.edit = async (req, res) => {
            console.log(req.body, 'abccccccccc');
            let products = await this.productService.edit(req.params.product_id, req.body);
            return res.status(200).json(products);
        };
        this.delete = async (req, res) => {
            let products = await this.productService.delete(+req.params.product_id);
            return res.status(200).json(products);
        };
        this.productService = new product_service_1.ProductService();
        this.categoryService = new category_service_1.CategoryService();
    }
}
exports.ProductController = ProductController;
exports.default = new ProductController();
//# sourceMappingURL=product_controller.js.map