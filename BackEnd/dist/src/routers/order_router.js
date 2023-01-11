"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order_router = void 0;
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../controller/order_controller"));
exports.order_router = (0, express_1.Router)();
exports.order_router.get('/all', order_controller_1.default.displayAllOrder);
exports.order_router.get('/user/:user', order_controller_1.default.displayAnUserOrders);
exports.order_router.get('/an-order/:order', order_controller_1.default.displayAnOrderDetails);
exports.order_router.post('/create-order', order_controller_1.default.createOrder);
exports.order_router.put('/cancel-order/:order', order_controller_1.default.cancelOrder);
//# sourceMappingURL=order_router.js.map