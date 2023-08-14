export interface Categories {
    id?:number;
    name?: string | null;
    levelCategory?:number;
    childrenCategories?: Categories[];
}