"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../service/product_service");
class ProductController {
    constructor() {
        this.getAll = async (req, res) => {
            let products = await this.productService.findAll();
            return res.status(200).json(products);
        };
        this.finByName = async (req, res) => {
            let product = req.body;
            let productFind = await this.productService.findByName(product.product_name);
            return res.status(201).json(productFind);
        };
        this.add = async (req, res) => {
            let products = await this.productService.add(req, res);
            return res.status(200).json(products);
        };
        this.edit = async (req, res) => {
            let products = await this.productService.edit(req, res);
            return res.status(200).json(products);
        };
        this.delete = async (req, res) => {
            let products = await this.productService.delete(req, res);
            return res.status(200).json(products);
        };
        this.productService = new product_service_1.ProductService();
    }
}
exports.ProductController = ProductController;
exports.default = new ProductController();
//# sourceMappingURL=product_controller.js.map