"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const cart_1 = require("../model/cart");
class CartService {
    constructor() {
        this.getAnUserCart = async (id) => {
            let query = `select p.name_product, c.quantity, p.price, p.url
                     from carts as c
                              join products p on c.product_id = p.product_id
                              join users u on c.user_id = u.user_id
                     where c.user_id = ${id}`;
            let result = await this.cartRepo.query(query);
            return result;
        };
        this.addProduct = async (input) => {
            let query = `select *
                     from carts
                     where user_id like ${input.user_id}
                       and product_id like ${input.product_id}`;
            let checkAvail = await this.cartRepo.query(query);
            if (checkAvail.length == 0) {
                let result = await this.cartRepo.save(input);
                return result;
            }
            else {
                return "This product is already in your cart";
            }
        };
        data_source_1.AppDataSource.initialize().then(async (connection) => {
            console.log('Fetched cart data');
            this.cartRepo = await connection.getRepository(cart_1.Cart);
        });
    }
}
exports.default = new CartService();
//# sourceMappingURL=cart_service.js.map