import { Request, Response } from "express";
declare class OrderController {
    displayAllOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    displayAnUserOrders: (req: Request, res: Response) => Promise<import("express-serve-static-core").Send<any, Response<any, Record<string, any>>>>;
}
declare const _default: OrderController;
export default _default;
