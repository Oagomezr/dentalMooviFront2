import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesData } from 'src/app/models/categories/categoriesData';
import { ProductsData } from 'src/app/models/products/productsData';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isAuthenticate:boolean = false;
  name?: string|null;
  lastName?: string|null;
  categories?: CategoriesData[] = JSON.parse(localStorage.getItem('categories') ?? 'null');

  constructor(private authSer: AuthenticateService, private productsSer: ProductsService, private router: Router){}

  ngOnInit(): void {
    let email = localStorage.getItem('email');
    if(email!=null){
      this.authSer.getUserByEmail(email).subscribe({
        next: response => {
          this.name=response.firstName;
          this.lastName=response.lastName;
          this.isAuthenticate=true;
        },
        error: error => {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          this.isAuthenticate=false;
          console.log("Error to get email", error);
        }
      });
    }
  }

  logout(){
    let jwt = localStorage.getItem('token');
    if(jwt != null){
      this.authSer.logout(jwt).subscribe({
        next: () => {
          console.log("Logout complete");
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          window.location.reload();
        },
        error: error => {
          console.error('Error in logout:', error);
        }
      });
    }else{
      console.log("User not login");
    }
  }

  showHoverBoxProfile: boolean = true;
  showHoverBoxProducts: boolean = true;

  showBoxProfile(show: boolean): void {
    this.showHoverBoxProfile = !show;
  }

  showBoxProducts(show: boolean): void{
    this.showHoverBoxProducts = !show;
  }

  products?: ProductsData[];
  notFoundProducts: boolean = false;
  searchProduct(inputSearch: any){
    let nameProduct: string = inputSearch.target.value;
    let productFound = document.getElementById('search');
    if (nameProduct.length > 1){
      if(productFound) productFound.classList.add('search-found');
      this.productsSer.getProductsBySearch(nameProduct, true, 0, 0).subscribe({
        next: response => {
          this.products = response.data;
          this.products.length == 0 ? this.notFoundProducts = true : this.notFoundProducts = false;
        },
        error: error => {
          console.error("Products not found:", error);
        }
      });
    }else{
      this.products = [];
      if(productFound) productFound.classList.remove('search-found');
    }
  }

  selectInputSearch(nameProduct: string){
    if (nameProduct && nameProduct.length > 1) {
      const newRoute = '/category/' + nameProduct + ',Buscar';
      this.router.navigateByUrl(newRoute).then(() => {
        window.location.reload();
      });
    } else {
      let inputVoid = document.getElementById('search-products');
      inputVoid?.focus();
    }
  }
}
