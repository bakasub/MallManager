import {AppDataSource} from "../data-source";
import {Product} from "../model/product";


export class ProductService {
    private productRepository: any;

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.productRepository = connection.getRepository(Product);
        })
        this.productRepository = AppDataSource.getRepository(Product);
    }

    findAll = async () => {
        let products = await this.productRepository.query(`select *
                                                           from Products
                                                                    JOIN Category on Products.category_id = Category.category_id`);
        return products
    }
    findByName = async (name_product) => {
        let products = await this.productRepository.query(`select *
                                                           from products
                                                           where name_product like '%${name_product}%'`)
        return products
    }

    add = async (product) => {
        let products = await this.productRepository.save(product)
        return products
    }
    edit = async (product_id, product) => {
        let products = await this.productRepository.update(product_id, product);
        return products
    }
    delete = async (productId: number) => {
        let products = await this.productRepository.delete(productId);
        return products
    }
    advancedFilter = async (input) => {
        if (input.price == 0) {
            let result = await this.productRepository.query(`select *
                                                             from products`)
            return result
        }
        if (input.price == 1) {
            let result = await this.productRepository.query(`select *
                                                             from products
                                                             where price BETWEEN 0 and 10000000`)
            return result
        } if (input.price == 2) {
            let result = await this.productRepository.query(`select *
                                                             from products
                                                             where price BETWEEN 10000000 and 20000000`)
            return result
        } if (input.price == 3) {
            let result = await this.productRepository.query(`select *
                                                             from products
                                                             where price BETWEEN 20000000 and 100000000`)
            return result
        }
    }
}

export default new ProductService();