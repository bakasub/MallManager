export declare class ProductService {
    private productRepository;
    constructor();
    findAll: () => Promise<any>;
    findByName: (name_product: any) => Promise<any>;
    add: (product: any) => Promise<any>;
    edit: (product_id: any, product: any) => Promise<any>;
    delete: (productId: number) => Promise<any>;
}
declare const _default: ProductService;
export default _default;
