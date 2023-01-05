"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const product_router_1 = require("./product_router");
const user_router_1 = require("./user_router");
const cart_router_1 = require("./cart_router");
const category_router_1 = require("./category_router");
exports.router = (0, express_1.Router)();
exports.router.use('/products', product_router_1.product_router);
exports.router.use('/auth', user_router_1.user_router);
exports.router.use('/cart', cart_router_1.cart_router);
exports.router.use('/category', category_router_1.category_router);
//# sourceMappingURL=router.js.map