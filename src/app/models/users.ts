import { Addresses } from "./addresses";
import { Roles } from "./roles";

export interface Users {
    idUser?: number | null;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    celPhone?: string | null;
    birthday?: string | null;
    gender?: string | null;
    password?: string | null;
    roles?: Roles[];
    addresses?: Addresses[];
}