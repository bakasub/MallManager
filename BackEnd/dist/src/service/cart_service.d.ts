declare class CartService {
    cartRepo: any;
    constructor();
    getAnUserCart: (id: any) => Promise<any>;
    addProduct: (input: any) => Promise<any>;
}
declare const _default: CartService;
export default _default;
