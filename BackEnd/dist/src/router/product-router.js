"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controller/product-controller"));
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get('/all', product_controller_1.default.displayAll);
exports.productRouter.get('/one/:id', product_controller_1.default.displayOne);
exports.productRouter.post('/create', product_controller_1.default.createProduct);
exports.productRouter.put('/update/:id', product_controller_1.default.updateInfo);
exports.productRouter.delete('/delete/:id', product_controller_1.default.removeProduct);
//# sourceMappingURL=product-router.js.map