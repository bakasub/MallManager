"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const order_1 = require("../model/order");
class OrderService {
    constructor() {
        this.getListOrders = async () => {
            let list = await this.orderRepo.find();
            return list;
        };
        this.getAnUserOrders = async (id) => {
            let query = `select * from orders where user_id = '${id}'`;
            let list = await this.orderRepo.query(query);
            return list;
        };
        data_source_1.AppDataSource.initialize().then(async (connection) => {
            this.orderRepo = await connection.getRepository(order_1.Order);
        });
    }
}
exports.default = new OrderService();
//# sourceMappingURL=order_service.js.map