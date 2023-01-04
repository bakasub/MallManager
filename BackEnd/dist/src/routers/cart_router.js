"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cart_router = void 0;
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controller/cart_controller"));
exports.cart_router = (0, express_1.Router)();
exports.cart_router.get('/get-cart/:user_id', cart_controller_1.default.displayAnUserCart);
exports.cart_router.post('/add', cart_controller_1.default.addProduct);
//# sourceMappingURL=cart_router.js.map