import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoriesData } from 'src/app/models/categories/categoriesData';
import { ProductsData } from 'src/app/models/products/productsData';
import { ImagesService } from 'src/app/services/images/images.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent {

  constructor(private route: ActivatedRoute) {}

  locationCategory: string[] = [];
  currentPage?: string;
  categories?: CategoriesData[] = JSON.parse(localStorage.getItem('categories') || 'null');
  beforeExpanded: string[]=[];
  expandedCategories: { [key: string]: boolean } = {};
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.locationCategory = params['parents'].split(',');
      this.toggleSubcategories(this.locationCategory, true);
    });
  }

  toggleSubcategories(categoryAndParents: string[], init: boolean) { 
    if(init){
      for(let i=0; i < categoryAndParents.length ; i++){
        this.expandedCategories[categoryAndParents[categoryAndParents.length-i-1]] = true;
        this.beforeExpanded[i] = categoryAndParents[categoryAndParents.length-i-1];
      }
    }else{
      this.expandedCategories[categoryAndParents[0]] = !this.expandedCategories[categoryAndParents[0]];
      if(this.beforeExpanded && this.beforeExpanded[categoryAndParents.length-1] != categoryAndParents[0]){
        this.expandedCategories[this.beforeExpanded[categoryAndParents.length-1]] = false;
      } 
      this.beforeExpanded[categoryAndParents.length-1] = categoryAndParents[0];
    }
  }
  
  receiveCurrentPage(currentPage : number){
    this.currentPage = 'Pagina '+currentPage;
  }

  checkLocalStorage() {
    const used = Math.round((JSON.stringify(localStorage).length / 1024));

    for (let i = 0, data = "1".repeat(10000); ; i++) {
        try { 
            localStorage.setItem("DATA", data);
            data = data +  "1".repeat(100000);
        } catch(e) {
            const total = Math.round((JSON.stringify(localStorage).length / 1024));
            console.log("Total: " + total + " kB");
            console.log("Used: " + used + " kB");
            console.log("FREE: " + (total - used) + " kB");
            break;
        }
    }

    localStorage.removeItem('DATA');
  }

}
