export interface Categories {
    name?: string | null;
    levelCategory?:number;
    childrenCategories?: Categories[];
}