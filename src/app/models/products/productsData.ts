import { Images } from "../Images";

export interface ProductsData {
    nameProduct: string;
    unitPrice: number;
    description: string;
    shortDescription: string;
    stock: number;
    images:Images[];
    location: string[];
    hidden:string | null;
}