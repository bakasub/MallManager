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
            console.log(input, "input");
            console.log(isNaN(input.price), isNaN(input.category_id));
            if (input.price == '' && input.category_id == '') {
                let result = await this.productRepository.query(`select *
                                                             from products
                                                             where name_product like '%${input.name_product}%'`);
                return result;
            }
            else if (input.price !== '') {
                let result = await this.productRepository.query(`select *
                                                             from products
                                                             where name_product like '%${input.name_product}%'
                                                               and price = '${input.price}'
            `);
                return result;
            }
            else if (input.category_id !== '') {
                let result = await this.productRepository.query(`select *
                                                             from products
                                                             where name_product like '%${input.name_product}%'
                                                               and category_id = '${input.category_id}'`);
                return result;
            }
            else {
                let result = await this.productRepository.query(`select *
                                                             from products
                                                             where name_product like '%${input.name_product}%'
                                                               and price = '${input.price}'
                                                               and category_id = '${input.category_id}'`);
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