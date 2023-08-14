import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ImagesService } from 'src/app/services/images/images.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent {

  constructor(private route: ActivatedRoute, private productSer: ProductsService, private imageSer: ImagesService) {}

  categoryIdentifier : number = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryIdentifier = params['categoryIdentifier'];
      console.log(this.categoryIdentifier);
      this.productSer.getProductsByCategory(this.categoryIdentifier).subscribe({
        next: response => {
          console.log(response);
        },
        error: error => {
          console.error("error to load product: "+error);
        }
      });
    });
  }

  

  categories: { [key: string]: string[] } | null = JSON.parse(localStorage.getItem('categories') || 'null');
  classSubcategory: string[] =['one','two','three','four'];
  
  beforeExpanded: string[]=[];
  expandedCategories: { [key: string]: boolean } = {};

  toggleSubcategories(categoryKey: string, lvlCategory: number) {
    this.expandedCategories[categoryKey] = !this.expandedCategories[categoryKey];
    if(this.beforeExpanded && this.beforeExpanded[lvlCategory] != categoryKey) this.expandedCategories[this.beforeExpanded[lvlCategory]] = false;
    this.beforeExpanded[lvlCategory] = categoryKey;
  }
}
