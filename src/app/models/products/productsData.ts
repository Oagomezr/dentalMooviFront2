import { Images } from "../Images";

export interface ProductsData {
    nameProduct: string;
    unitPrice: number;
    description: string;
    stock: number;
    images:Images[];
    location: string[];
}