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
exports.order_router.get('/user/:id', order_controller_1.default.displayAnUserOrders);
//# sourceMappingURL=order_router.js.map