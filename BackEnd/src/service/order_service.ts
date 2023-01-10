import {AppDataSource} from "../data-source";
import {Order} from "../model/order";

class OrderService {
    orderRepo: any
    constructor() {
        AppDataSource.initialize().then( async connection => {
            this.orderRepo = await connection.getRepository(Order)
        })
    }

    getListOrders = async () => {
        let list = await this.orderRepo.find()
        return list
    }

    getAnUserOrders = async (id) => {
        let query = `select * from orders where user_id = '${id}'`
        let list = await this.orderRepo.query(query)
        return list
    }
}

export default new OrderService()