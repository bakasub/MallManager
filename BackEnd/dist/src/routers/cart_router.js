"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cart_router = void 0;
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controller/cart_controller"));
exports.cart_router = (0, express_1.Router)();
exports.cart_router.get('/get-cart/:id', cart_controller_1.default.displayAnUserCart);
exports.cart_router.post('/add', cart_controller_1.default.addProduct);
exports.cart_router.post('/decrease-quantity', cart_controller_1.default.decreaseQuantity);
exports.cart_router.post('/increase-quantity', cart_controller_1.default.increaseQuantity);
exports.cart_router.delete('/remove-one', cart_controller_1.default.removeAProduct);
exports.cart_router.delete('/remove-all', cart_controller_1.default.removeAllProduct);
//# sourceMappingURL=cart_router.js.map