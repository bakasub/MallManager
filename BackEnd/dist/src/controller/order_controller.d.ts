import { Request, Response } from "express";
declare class OrderController {
    displayAllOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    displayAnUserOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    cancelOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    displayAnOrderDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    confirmOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    displayUserConfirmedOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: OrderController;
export default _default;
