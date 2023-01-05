import {AppDataSource} from "../data-source";
import {Request, Response} from "express";
import {Product} from "../model/product";


export class ProductService {
    private productRepository: any;

    constructor() {
        AppDataSource.initialize().then(connection => {
            console.log('Connect Database Success!')
            this.productRepository = connection.getRepository(Product);
        })
        this.productRepository = AppDataSource.getRepository(Product);
    }

    findAll = async () => {
        let products = await this.productRepository.find();
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
        // let product_id= +req.params.product_id;
        // let product = req.body;
        let products = await this.productRepository.update(product_id, product);
        return products
    }

    delete = async (productId: number) => {
        let products = await this.productRepository.delete(productId);
        return products
    }

    advancedFilter = async (input) => {
        console.log(input, "input")
        console.log(isNaN(input.price), isNaN(input.category_id))
        if (isNaN(input.price) == false && isNaN(input.category_id) == false) {
            let result = await this.productRepository.query(`select *
                                                             from products
                                                             where name_product like '%${input.name_product}%'`)
            return result
        } else if (isNaN(input.price) == false) {
            let result = await this.productRepository.query(`select *
                                                             from products
                                                             where name_product like '%${input.name_product}%'
                                                               and price = '${input.price}'
            `)
            return result
        } else if (isNaN(input.category_id) == false) {
            let result = await this.productRepository.query(`select *
                                                             from products
                                                             where name_product like '%${input.name_product}%'
                                                               and category_id = '${input.category_id}'`)
            return result
        } else {
            let result = await this.productRepository.query(`select *
                                                             from products
                                                             where name_product like '%${input.name_product}%'
                                                               and price = '${input.price}'
                                                               and category_id = '${input.category_id}'`)
            return result
        }
    }
}

export default new ProductService();
