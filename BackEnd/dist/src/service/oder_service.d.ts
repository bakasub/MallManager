declare class OrderService {
    orderRepo: any;
    orderDetailRepo: any;
    cartRepo: any;
    constructor();
    getListOrders: () => Promise<any>;
    getAnUserOrders: (id: any) => Promise<any>;
    createOrder: (input: any) => Promise<string>;
    cancelOrder: (orderId: any) => Promise<string>;
    displayAnOrderDetails: (orderId: any) => Promise<any>;
    confirmOrder: (orderId: any) => Promise<void>;
}
declare const _default: OrderService;
export default _default;
