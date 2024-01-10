import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartDtoResponse } from 'src/app/models/cart/cartData';
import { CartRequest } from 'src/app/models/cart/cartRequest';
import { CartResponse } from 'src/app/models/cart/cartResponse';
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
  cartRequest: CartRequest = { data: [] };
  cartResponse: CartResponse = { data: [], total:0, amountOfProducts:0};

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
          let userInfo = JSON.stringify(response);
          localStorage.setItem('userData', userInfo);
        },
        error: error => {
          localStorage.removeItem("isLogged");
          localStorage.removeItem("isAdmin");
          localStorage.removeItem("userData");
          localStorage.removeItem("addressChosen");
          localStorage.removeItem("callerCart");
          this.isAuthenticate=false;
          console.log("Error to get user info", error);
        }
      });
    }

    if(localStorage.getItem('callerCart')){
      let cartData = JSON.parse(localStorage.getItem('callerCart')!);
      this.cartRequest.data = cartData;
      this.productsSer.getShoppingCartProducts(this.cartRequest).subscribe({
        next: response=>{
          this.cartResponse = response;
        },error:e=>{
          console.log(e);
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
          localStorage.removeItem("userData");
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
  showHoverBoxCart: boolean = true;

  showBoxProfile(show: boolean): void {
    this.showHoverBoxProfile = !show;
  }

  showBoxProducts(show: boolean): void{
    this.showHoverBoxProducts = !show;
  }

  showBoxCart(show: boolean): void{
    this.showHoverBoxCart = !show;
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

  /* shoppingCart : Cart ={
    products: [],
    amount: [],
    prize: [],
  } */
}
