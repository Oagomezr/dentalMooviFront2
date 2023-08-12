import { Component } from '@angular/core';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent {
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
