import {AppDataSource} from "../data-source";
import {Order} from "../model/order";
import {OrderDetail} from "../model/order_detail";
import {Cart} from "../model/cart";

class OrderService {
    orderRepo: any
    orderDetailRepo: any
    cartRepo: any

    constructor() {
        AppDataSource.initialize().then(async connection => {
            this.orderRepo = await connection.getRepository(Order)
            this.orderDetailRepo = await connection.getRepository(OrderDetail)
            this.cartRepo = await connection.getRepository(Cart)
        })
    }

    getListOrders = async () => {
        let list = await this.orderRepo.find()
        return list
    }

    getAnUserOrders = async (id) => {
        let query = `select *
                     from orders
                     where user_id = '${id}'`
        let list = await this.orderRepo.query(query)
        return list
    }

    createOrder = async (input) => {
        //Get cart
        let order = await this.cartRepo.query(`select *
                                               from carts
                                               where user_id = '${input.user_id}'`)
        //Create order
        await this.orderRepo.query(`insert into orders(user_id)
                                    values ('${input.user_id}')`)
        //Get new order id
        let newestOrder = await this.orderRepo.query(`select order_id
                                                      from orders
                                                      where user_id = ${input.user_id}`)
        let orderId = newestOrder[newestOrder.length - 1].order_id
        //Transfer products details from cart to order
        for (let i = 0; i < order.length; i++) {
            let product = {
                order_id: orderId,
                user_id: input.user_id,
                product_id: order[i].product_id,
                productQuantity: order[i].cartQuantity
            }
            await this.orderDetailRepo.save(product)
        }
        //Clear cart
        await this.cartRepo.query(`delete
                                   from carts
                                   where user_id = '${input.user_id}'`)
        return "Created order"
    }

    cancelOrder = async (orderId) => {
        let query = `update orders
                     set status = 3
                     where order_id = '${orderId}'`
        await this.orderRepo.query(query)
        return "Canceled order"
    }

    displayAnOrderDetails = async (orderId) => {
        let query = `select p.name_product,o2.productQuantity,p.quantity,o.order_id
                     from orders as o
                     join orderdetail o2 on o.order_id = o2.order_id
                     join products p on o2.product_id = p.product_id
                     where o.order_id = '${orderId}'`
        let result = await this.orderRepo.query(query)
        return result
    }

    confirmOrder = async (orderId) => {

    }
}

export default new OrderService()