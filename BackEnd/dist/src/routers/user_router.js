"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_router = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user_controller"));
exports.user_router = (0, express_1.Router)();
exports.user_router.post('/register', user_controller_1.default.register);
exports.user_router.post('/login', user_controller_1.default.login);
exports.user_router.get('/users', user_controller_1.default.getAll);
exports.user_router.put('/:user_id', user_controller_1.default.edit);
exports.user_router.delete('/:user_id', user_controller_1.default.delete);
exports.user_router.post('/find-by-name', user_controller_1.default.finByName);
//# sourceMappingURL=user_router.js.map