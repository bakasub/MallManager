declare class OrderService {
    orderRepo: any;
    orderDetailRepo: any;
    cartRepo: any;
    productRepo: any;
    constructor();
    getListOrders: () => Promise<any>;
    getAnUserOrders: (id: any) => Promise<any>;
    createOrder: (input: any) => Promise<string>;
    cancelOrder: (orderId: any) => Promise<string>;
    getAnOrderDetails: (orderId: any) => Promise<any>;
    confirmOrder: (orderId: any) => Promise<any>;
    getUserConfirmedOrders: (userId: any) => Promise<any>;
}
declare const _default: OrderService;
export default _default;
