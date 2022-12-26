"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const data_source_1 = require("../data-source");
const product_1 = require("../model/product");
class ProductService {
    constructor() {
        this.findAll = async () => {
            let products = await this.productRepository.find();
            return products;
        };
        this.findByName = async (name_product) => {
            let products = await this.productRepository.query(`select * from posts where name_product like '%${name_product}%'`);
            return products;
        };
        this.add = async (req, res) => {
            let product = req.body;
            let products = await this.productRepository.save(product);
            return products;
        };
        this.edit = async (req, res) => {
            let id = +req.params.product_id;
            let product = req.body;
            let products = await this.productRepository.update({ product_id: id }, product);
            return products;
        };
        this.delete = async (req, res) => {
            let id = +req.params.product_id;
            let products = await this.productRepository.delete(id);
            return products;
        };
        data_source_1.AppDataSource.initialize().then(connection => {
            console.log('Connect Database Success!');
            this.productRepository = connection.getRepository(product_1.Product);
        });
        this.productRepository = data_source_1.AppDataSource.getRepository(product_1.Product);
    }
}
exports.ProductService = ProductService;
exports.default = new ProductService();
//# sourceMappingURL=product_service.js.map