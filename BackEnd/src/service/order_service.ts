import {AppDataSource} from "../data-source";
import {Order} from "../model/order";
import {OrderDetail} from "../model/order_detail";
import {Cart} from "../model/cart";
import {Product} from "../model/product";

class OrderService {
    orderRepo: any
    orderDetailRepo: any
    cartRepo: any
    productRepo: any

    constructor() {
        AppDataSource.initialize().then(async connection => {
            this.orderRepo = await connection.getRepository(Order)
            this.orderDetailRepo = await connection.getRepository(OrderDetail)
            this.cartRepo = await connection.getRepository(Cart)
            this.productRepo = await connection.getRepository(Product)
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

    getAnOrderDetails = async (orderId) => {
        let query = `select p.name_product, o2.productQuantity, p.quantity, o.order_id, p.price
                     from orders as o
                              join orderdetail o2 on o.order_id = o2.order_id
                              join products p on o2.product_id = p.product_id
                     where o.order_id = '${orderId}'`
        let result = await this.orderRepo.query(query)
        return result
    }

    confirmOrder = async (orderId) => {
        let orderQuantity = await this.orderRepo.query(`select o.order_id,
                                                               o2.productQuantity,
                                                               p.quantity,
                                                               p.product_id,
                                                               o.status
                                                        from orders as o
                                                                 join orderdetail o2 on o.order_id = o2.order_id
                                                                 join products p on o2.product_id = p.product_id
                                                        where o.order_id = '${orderId}'`)
        for (let i = 0; i < orderQuantity.length; i++) {
            let newQuantity = orderQuantity[i].quantity - orderQuantity[i].productQuantity
            await this.productRepo.query(`update products
                                          set quantity = '${newQuantity}'
                                          where product_id = '${orderQuantity[i].product_id}'`)
        }
        await this.orderRepo.query(`update orders
                                    set status = 2
                                    where order_id = '${orderId}' `)
        let result = await this.orderRepo.query(`select *
                                                 from orders
                                                 where order_id = '${orderId}'`)
        return result
    }

    getUserConfirmedOrders = async (userId) => {
        let query = `select *
                     from orders
                     where user_id = '${userId}'
                       and status = 2`
        let list = await this.orderRepo.query(query)
        return list
    }

}

export default new OrderService()