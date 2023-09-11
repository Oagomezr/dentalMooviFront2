import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsData } from 'src/app/models/products/productsData';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  constructor(private route: ActivatedRoute, private productSer: ProductsService) {}

  locationCategory: string[] = [];
  nameProduct: string = '';
  indexImg: number = 0;

  product: ProductsData ={
    nameProduct: '',
    unitPrice: 0,
    description: '',
    stock: 0,
    images:[],
    location: [],
  };

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.nameProduct = params['product'];
      
      this.productSer.getProductByName(this.nameProduct).subscribe({
        next: response => {
          this.product = response;
          console.log(response);
          this.locationCategory = response.location;
        },
        error: error => {
          console.error("error to load product: "+error);
        }
      });
    });
  }

  changeImg(index: number){
    this.indexImg = index;
  }
}
