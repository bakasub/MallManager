"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const data_source_1 = require("../data-source");
const product_1 = require("../model/product");
class ProductService {
    constructor() {
        this.findAll = async () => {
            let products = await this.productRepository.query(`select *
                                                           from products
                                                                    JOIN Category on Products.category_id = Category.category_id`);
            return products;
        };
        this.findByName = async (name_product) => {
            let products = await this.productRepository.query(`select *
                                                           from products
                                                           where name_product like '%${name_product}%'`);
            return products;
        };
        this.add = async (product) => {
            let products = await this.productRepository.save(product);
            return products;
        };
        this.edit = async (product_id, product) => {
            let products = await this.productRepository.update(product_id, product);
            return products;
        };
        this.delete = async (productId) => {
            let products = await this.productRepository.delete(productId);
            return products;
        };
        this.advancedFilter = async (input) => {
            console.log('inputtt', input);
            if (input.price == 0) {
                let result = await this.productRepository.query(`select *
                                                             from products`);
                return result;
            }
            if (input.price == 1) {
                let result = await this.productRepository.query(`select *
                                                             from products
                                                             where price BETWEEN 0 and 10000000`);
                return result;
            }
            if (input.price == 2) {
                let result = await this.productRepository.query(`select *
                                                             from products
                                                             where price BETWEEN 10000000 and 20000000`);
                return result;
            }
            if (input.price == 3) {
                let result = await this.productRepository.query(`select *
                                                             from products
                                                             where price BETWEEN 20000000 and 100000000`);
                return result;
            }
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