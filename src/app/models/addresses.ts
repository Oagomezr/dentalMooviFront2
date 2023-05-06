import { Users } from "./users";

export interface Addresses {
    idAddress: number;
    country: string;
    departament: string;
    location: string;
    neighborhood?: string;
    address: string;
    phoneContact: string;
    users?: Users[];
}