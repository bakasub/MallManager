import {AppDataSource} from "../data-source";
import {Product} from "../model/product";

class ProductService {
    productRepo: any

    constructor() {
        AppDataSource.initialize().then(async connection => {
            console.log('Fetched product data')
            this.productRepo = await connection.getRepository(Product)
        })
    }

    getAll = async () => {
        let list = await this.productRepo.find()
        return list
    }

    createProduct = async (input) => {
        let product = await this.productRepo.save(input)
        return product
    }

    updateInfo = async (id, input) => {
        let result = ''
        const findProduct = await this.productRepo.findOneBy({id: id})
        if (!findProduct) {
            result = 'That product doesnt exist'
        } else {
            let query = `update product set name='${input.name}',price= ${input.price},quantity = ${input.quantity},description = '${input.description}',image = '${input.image}'where id = ${findProduct.id}`
            await this.productRepo.query(query)
            result = this.productRepo.query(`select *
                                             from product
                                             where id = ${findProduct.id}`)
            return result
        }
    }
}

export default new ProductService()