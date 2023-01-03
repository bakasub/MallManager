"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user-controller"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/all', user_controller_1.default.displayAll);
exports.userRouter.post('/register', user_controller_1.default.register);
exports.userRouter.post('/login', user_controller_1.default.login);
exports.userRouter.put('/change-pw/:id', user_controller_1.default.changePassword);
exports.userRouter.put('/update-info/:id', user_controller_1.default.updateInfo);
exports.userRouter.delete('/delete/:id', user_controller_1.default.removeUser);
//# sourceMappingURL=user-router.js.map