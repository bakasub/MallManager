"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const order_1 = require("../model/order");
const order_detail_1 = require("../model/order_detail");
const cart_1 = require("../model/cart");
const product_1 = require("../model/product");
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
        this.getAnOrderDetails = async (orderId) => {
            let query = `select p.name_product, o2.productQuantity, p.quantity, o.order_id, p.price
                     from orders as o
                              join orderdetail o2 on o.order_id = o2.order_id
                              join products p on o2.product_id = p.product_id
                     where o.order_id = '${orderId}'`;
            let result = await this.orderRepo.query(query);
            return result;
        };
        this.confirmOrder = async (orderId) => {
            let orderQuantity = await this.orderRepo.query(`select o.order_id,
                                                               o2.productQuantity,
                                                               p.quantity,
                                                               p.product_id,
                                                               o.status
                                                        from orders as o
                                                                 join orderdetail o2 on o.order_id = o2.order_id
                                                                 join products p on o2.product_id = p.product_id
                                                        where o.order_id = '${orderId}'`);
            for (let i = 0; i < orderQuantity.length; i++) {
                let newQuantity = orderQuantity[i].quantity - orderQuantity[i].productQuantity;
                await this.productRepo.query(`update products
                                          set quantity = '${newQuantity}'
                                          where product_id = '${orderQuantity[i].product_id}'`);
            }
            await this.orderRepo.query(`update orders
                                    set status = 2
                                    where order_id = '${orderId}' `);
            let result = await this.orderRepo.query(`select *
                                                 from orders
                                                 where order_id = '${orderId}'`);
            return result;
        };
        this.getUserConfirmedOrders = async (userId) => {
            let query = `select *
                     from orders
                     where user_id = '${userId}'
                       and status = 2`;
            let list = await this.orderRepo.query(query);
            return list;
        };
        data_source_1.AppDataSource.initialize().then(async (connection) => {
            this.orderRepo = await connection.getRepository(order_1.Order);
            this.orderDetailRepo = await connection.getRepository(order_detail_1.OrderDetail);
            this.cartRepo = await connection.getRepository(cart_1.Cart);
            this.productRepo = await connection.getRepository(product_1.Product);
        });
    }
}
exports.default = new OrderService();
//# sourceMappingURL=order_service.js.map