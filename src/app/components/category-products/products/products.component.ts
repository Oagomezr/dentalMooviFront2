import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsData } from 'src/app/models/products/productsData';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

    /* this.categoriesSer.checkupdate().subscribe({
        next: response => { */

    ngOnInit(): void {
        this.getProducts();
    }

    constructor(private productsSer: ProductsService) {}

    @Output() sendCurrentPage = new EventEmitter<number>();
    @Input() locationCategory: string[] = [];

    products?: ProductsData[];
    currentPage = 1;
    productsPerPage = 8;
    totalPages: number = 0;

    get pages() {
        return Array.from({ length: this.totalPages });
    }

    prevPage() {
        this.currentPage--;
        this.getProducts();
    }

    nextPage() {
        this.currentPage++;
        this.getProducts();
    }

    changePage(pageNumber: number) {
        this.currentPage = pageNumber;
        this.getProducts();
    }

    private getProducts(){
        this.productsSer.getProductsByCategory(this.locationCategory[0], this.currentPage, this.productsPerPage).subscribe({
            next: response =>{
                this.products = response.data;
                if(this.totalPages < 1)this.totalPages = Math.ceil(response.amountProducts / this.productsPerPage);
                if(this.totalPages > 1) this.sendCurrentPage.emit(this.currentPage);
                window.scrollTo({ top: 100, behavior: 'smooth' });
            },
            error: error =>{
                console.error('Error to get products', error)
            }
        });
    }

}
