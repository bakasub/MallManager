"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../service/user-service"));
class UserController {
    constructor() {
        this.displayAll = async (req, res) => {
            let list = await user_service_1.default.getAll();
            return res.status(200).json(list);
        };
        this.register = async (req, res) => {
            let user = req.body;
            let result = await user_service_1.default.register(user);
            return res.status(200).json(result);
        };
        this.login = async (req, res) => {
            let user = req.body;
            let result = await user_service_1.default.login(user);
            return res.status(200).json(result);
        };
        this.changePassword = async (req, res) => {
            let userId = req.params.id;
            let input = req.body;
            let result = await user_service_1.default.changePassword(userId, input);
            return res.status(200).json(result);
        };
        this.updateInfo = async (req, res) => {
            let userId = req.params.id;
            let input = req.body;
            let result = await user_service_1.default.updateInfo(userId, input);
            return res.status(200).json(result);
        };
        this.removeUser = async (req, res) => {
            let id = req.params.id;
            await user_service_1.default.removeUser(id);
            return res.status(200).json({ message: "Removed user" });
        };
    }
}
exports.default = new UserController();
//# sourceMappingURL=user-controller.js.map