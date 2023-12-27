import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesData } from 'src/app/models/categories/categoriesData';
import { ProductsData } from 'src/app/models/products/productsData';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isAuthenticate:boolean = false;
  name?: string|null;
  lastName?: string|null;
  categories?: CategoriesData[];

  constructor(private userSer: UsersService, private productsSer: ProductsService, 
    private router: Router, private categoriesSer: CategoriesService, private authSer: AuthenticateService){
    this.categoriesSer.getCategories().subscribe({
      next: responseGetC =>{
        this.categories = responseGetC.data;
      },
      error: error=>{
        console.log('Error to get categories', error);
      }
    });

    let isLogged = localStorage.getItem('isLogged');
    if(isLogged!=null){
      this.userSer.getUser().subscribe({
        next: response => {
          this.name=response.firstName;
          this.lastName=response.lastName;
          this.isAuthenticate=true;
        },
        error: error => {
          localStorage.removeItem("isLogged");
          localStorage.removeItem("isAdmin");
          this.isAuthenticate=false;
          console.log("Error to get user info", error);
        }
      });
    }
  }

  logout(){
    let isLogged = localStorage.getItem('isLogged');
    if(isLogged != null){
      this.authSer.logout().subscribe({
        next: () => {
          console.log("Logout complete");
          localStorage.removeItem('isLogged');
          localStorage.removeItem("isAdmin");
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
          this.notFoundProducts = this.products.length == 0;
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
