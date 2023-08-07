import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hover-box-products',
  templateUrl: './hover-box-products.component.html',
  styleUrls: ['./hover-box-products.component.scss']
})
export class HoverBoxProductsComponent {
  @Input() categories?: { [key: string]: string[] } | null = null;
  number:number = 0;
  transitionIcon: boolean = false;

  showBoxSubcategories(transition:boolean){
    this.transitionIcon = transition;
  }

}
