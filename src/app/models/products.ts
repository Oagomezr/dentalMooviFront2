import { Images } from "./Images";

export interface Products {
    nameProduct: string;
    unitPrice: number;
    description: string;
    stock: number;
    images:Images[];
}