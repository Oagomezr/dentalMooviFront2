import { Component } from '@angular/core';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent {
  categories: { [key: string]: string[] } | null = JSON.parse(localStorage.getItem('categories') || 'null');
  
  beforeExpanded?: string;
  expandedCategories: { [key: string]: boolean } = {};

  toggleSubcategories(categoryKey: string) {
    this.expandedCategories[categoryKey] = !this.expandedCategories[categoryKey];
    if(this.beforeExpanded && this.beforeExpanded != categoryKey) this.expandedCategories[this.beforeExpanded] = false;
    this.beforeExpanded = categoryKey;
  }
}
