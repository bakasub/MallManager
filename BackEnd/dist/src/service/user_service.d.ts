import { Request, Response } from "express";
export declare class UserService {
    private userRepository;
    constructor();
    findAll: () => Promise<any>;
    login: (username: any) => Promise<any>;
    findByName: (username: any) => Promise<any>;
    add: (user: any) => Promise<any>;
    edit: (req: Request, res: Response) => Promise<any>;
    delete: (req: Request, res: Response) => Promise<any>;
}
