"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_service_1 = __importDefault(require("../service/cart_service"));
class CartController {
    constructor() {
        this.displayAnUserCart = async (req, res) => {
            let userId = +req.params.id;
            let result = await cart_service_1.default.getAnUserCart(userId);
            return res.status(200).json(result);
        };
        this.addProduct = async (req, res) => {
            let input = req.body;
            let result = await cart_service_1.default.addProduct(input);
            return res.status(200).json(result);
        };
        this.removeAProduct = async (req, res) => {
            let input = req.body;
            await cart_service_1.default.removeAProduct(input);
            return res.status(200).json({ message: "Removed!" });
        };
        this.removeAllProduct = async (req, res) => {
            let input = req.body;
            await cart_service_1.default.removeAllProduct(input);
            return res.status(200).json({ message: "Cleared your cart" });
        };
    }
}
exports.default = new CartController;
//# sourceMappingURL=cart_controller.js.map