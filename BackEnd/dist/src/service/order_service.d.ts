declare class OrderService {
    orderRepo: any;
    constructor();
    getListOrders: () => Promise<any>;
    getAnUserOrders: (id: any) => Promise<any>;
}
declare const _default: OrderService;
export default _default;
