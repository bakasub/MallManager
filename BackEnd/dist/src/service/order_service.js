"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const order_1 = require("../model/order");
const order_detail_1 = require("../model/order_detail");
const cart_1 = require("../model/cart");
class OrderService {
    constructor() {
        this.getListOrders = async () => {
            let list = await this.orderRepo.find();
            return list;
        };
        this.getAnUserOrders = async (id) => {
            let query = `select *
                     from orders
                     where user_id = '${id}'`;
            let list = await this.orderRepo.query(query);
            return list;
        };
        this.createOrder = async (input) => {
            let order = await this.cartRepo.query(`select *
                                               from carts
                                               where user_id = '${input.user_id}'`);
            await this.orderRepo.query(`insert into orders(user_id)
                                    values ('${input.user_id}')`);
            let newestOrder = await this.orderRepo.query(`select order_id
                                                      from orders
                                                      where user_id = ${input.user_id}`);
            let orderId = newestOrder[newestOrder.length - 1].order_id;
            for (let i = 0; i < order.length; i++) {
                let product = {
                    order_id: orderId,
                    user_id: input.user_id,
                    product_id: order[i].product_id,
                    productQuantity: order[i].cartQuantity
                };
                await this.orderDetailRepo.save(product);
            }
            await this.cartRepo.query(`delete
                                   from carts
                                   where user_id = '${input.user_id}'`);
            return "Created order";
        };
        this.cancelOrder = async (orderId) => {
            let query = `update orders
                     set status = 3
                     where order_id = '${orderId}'`;
            await this.orderRepo.query(query);
            return "Canceled order";
        };
        this.displayAnOrderDetails = async (orderId) => {
            let query = `select p.name_product,o2.productQuantity,p.quantity,o.order_id
                     from orders as o
                     join orderdetail o2 on o.order_id = o2.order_id
                     join products p on o2.product_id = p.product_id
                     where o.order_id = '${orderId}'`;
            let result = await this.orderRepo.query(query);
            return result;
        };
        this.confirmOrder = async (orderId) => {
        };
        data_source_1.AppDataSource.initialize().then(async (connection) => {
            this.orderRepo = await connection.getRepository(order_1.Order);
            this.orderDetailRepo = await connection.getRepository(order_detail_1.OrderDetail);
            this.cartRepo = await connection.getRepository(cart_1.Cart);
        });
    }
}
exports.default = new OrderService();
//# sourceMappingURL=order_service.js.map