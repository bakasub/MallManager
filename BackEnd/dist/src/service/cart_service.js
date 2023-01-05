"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const cart_1 = require("../model/cart");
class CartService {
    constructor() {
        this.getAnUserCart = async (id) => {
            let query = `select p.name_product, c.cartQuantity, p.price, p.url
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
                let newQuantity = (checkAvail[0].cartQuantity + 1);
                await this.cartRepo.query(`update carts
                                   set cartQuantity = ${newQuantity}
                                   where user_id = ${input.user_id}
                                     and product_id = ${input.product_id}`);
                let result = await this.cartRepo.query(`select *
                                                from carts
                                                where user_id = ${input.user_id}
                                                  and product_id = ${input.product_id}`);
                return result;
            }
        };
        this.removeAProduct = async (input) => {
            let query = `delete
                     from carts
                     where user_id = ${input.user_id}
                       and product_id = ${input.product_id}`;
            await this.cartRepo.query(query);
        };
        this.removeAllProduct = async (input) => {
            let query = `delete
                     from carts
                     where user_id = ${input.user_id}`;
            await this.cartRepo.query(query);
        };
        this.decreaseQuantity = async (input) => {
            let currentQuantity = await this.cartRepo.query(`select cartQuantity
                                                         from carts
                                                         where user_id = ${input.user_id}
                                                           and product_id = ${input.product_id}`);
            if (currentQuantity[0].cartQuantity == 0) {
                alert('Cannot lower the amount than 0');
                return currentQuantity[0].cartQuantity;
            }
            else {
                let newQuantity = (currentQuantity[0].cartQuantity - 1);
                await this.cartRepo.query(`update carts
                                       set cartQuantity = ${newQuantity}
                                       where user_id = ${input.user_id}
                                         and product_id = ${input.product_id}`);
                let result = await this.cartRepo.query(`select *
                                                    from carts
                                                    where user_id = ${input.user_id}
                                                      and product_id = ${input.product_id}`);
                return result[0].quantity;
            }
        };
        this.increaseQuantity = async (input) => {
            let currentQuantity = await this.cartRepo.query(`select cartQuantity
                                                         from carts
                                                         where user_id = ${input.user_id}
                                                           and product_id = ${input.product_id}`);
            let newQuantity = (currentQuantity[0].cartQuantity + 1);
            await this.cartRepo.query(`update carts
                                   set cartQuantity = ${newQuantity}
                                   where user_id = ${input.user_id}
                                     and product_id = ${input.product_id}`);
            let result = await this.cartRepo.query(`select *
                                                from carts
                                                where user_id = ${input.user_id}
                                                  and product_id = ${input.product_id}`);
            return result[0].quantity;
        };
        data_source_1.AppDataSource.initialize().then(async (connection) => {
            console.log('Fetched cart data');
            this.cartRepo = await connection.getRepository(cart_1.Cart);
        });
    }
}
exports.default = new CartService();
//# sourceMappingURL=cart_service.js.map