import { Request, Response } from "express";
declare class CartController {
    displayAnUserCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    addProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: CartController;
export default _default;
