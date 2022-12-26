import { Request, Response } from "express";
export declare class ProductService {
    private productRepository;
    constructor();
    findAll: () => Promise<any>;
    findByName: (name_product: any) => Promise<any>;
    add: (req: Request, res: Response) => Promise<any>;
    edit: (req: Request, res: Response) => Promise<any>;
    delete: (req: Request, res: Response) => Promise<any>;
}
declare const _default: ProductService;
export default _default;
