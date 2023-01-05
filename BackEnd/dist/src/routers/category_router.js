"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.category_router = void 0;
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../controller/category_controller"));
exports.category_router = (0, express_1.Router)();
exports.category_router.get('/all', category_controller_1.default.displayCategoryList);
exports.category_router.get('/filter-by-cate/:id', category_controller_1.default.filterByCategory);
exports.category_router.post('/create', category_controller_1.default.createCategory);
//# sourceMappingURL=category_router.js.map