import { Request, Response } from "express";
declare class CategoryController {
    displayCategoryList: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    filterByCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: CategoryController;
export default _default;
