"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.product_router = void 0;
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controller/product_controller"));
exports.product_router = (0, express_1.Router)();
exports.product_router.get('', product_controller_1.default.getAll);
exports.product_router.get('/find-by-name', product_controller_1.default.finByName);
exports.product_router.post('/filter', product_controller_1.default.advancedFilter);
exports.product_router.post('/add', product_controller_1.default.add);
exports.product_router.put('/:product_id', product_controller_1.default.edit);
exports.product_router.delete('/:product_id', product_controller_1.default.delete);
//# sourceMappingURL=product_router.js.map