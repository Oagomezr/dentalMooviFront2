import { ProductsData } from "./productsData";

export interface ProductsResponse {
    amountProducts: number;
    paginatedProducts: number;
    data: ProductsData[];
}