import { Component, Input } from '@angular/core';
import { Categories } from 'src/app/models/categories';

@Component({
  selector: 'app-hover-box-products',
  templateUrl: './hover-box-products.component.html',
  styleUrls: ['./hover-box-products.component.scss']
})
export class HoverBoxProductsComponent {
  @Input() categories?: Categories[];
  classSubcategory: string[] =['one','two','three','four'];

  ngOnInit(): void {
    console.log(this.categories);
  }

  assignClass(number: number): number {
    return (number - 1) % 4;
  }


}
