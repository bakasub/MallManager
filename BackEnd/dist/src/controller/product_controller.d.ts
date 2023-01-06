import { Request, Response } from "express";
export declare class ProductController {
    private productService;
    private categoryService;
    constructor();
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    finByName: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    add: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    edit: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    advancedFilter: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: ProductController;
export default _default;
