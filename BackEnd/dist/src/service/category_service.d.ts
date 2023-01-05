declare class CategoryService {
    private categoryRepository;
    constructor();
    findAll: () => Promise<any>;
    filterByCategoryId: (input: any) => Promise<any>;
    createCate: (input: any) => Promise<any>;
}
declare const _default: CategoryService;
export default _default;
