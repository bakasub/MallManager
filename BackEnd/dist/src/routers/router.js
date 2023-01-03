"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const product_router_1 = require("./product_router");
const user_router_1 = require("./user_router");
exports.router = (0, express_1.Router)();
exports.router.use('/products', product_router_1.product_router);
exports.router.use('/auth', user_router_1.user_router);
//# sourceMappingURL=router.js.map