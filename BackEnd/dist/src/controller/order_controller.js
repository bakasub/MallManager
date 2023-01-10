"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_service_1 = __importDefault(require("../service/order_service"));
class OrderController {
    constructor() {
        this.displayAllOrder = async (req, res) => {
            try {
                let list = await order_service_1.default.getListOrders();
                return res.status(200).json(list);
            }
            catch (e) {
                res.json({
                    mess: e.message
                });
            }
        };
        this.displayAnUserOrders = async (req, res) => {
            try {
                let userId = req.params.id;
                let list = await order_service_1.default.getAnUserOrders(userId);
                return res.status(200).json;
            }
            catch (e) {
                res.json({
                    mess: e.message
                });
            }
        };
    }
}
exports.default = new OrderController();
//# sourceMappingURL=order_controller.js.map