declare class UserService {
    userRepo: any;
    constructor();
    getAll: () => Promise<any>;
    register: (user: any) => Promise<any>;
    login: (user: any) => Promise<{
        message: string;
        token: string;
    } | {
        token: any;
        user_id: any;
        userName: any;
    }>;
    changePassword: (id: any, input: any) => Promise<string>;
    updateInfo: (id: any, input: any) => Promise<string>;
    removeUser: (id: any) => Promise<any>;
}
declare const _default: UserService;
export default _default;
