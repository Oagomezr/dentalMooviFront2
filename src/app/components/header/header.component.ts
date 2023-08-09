import { Component } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isAuthenticate:boolean = false;
  name?: string|null;
  lastName?: string|null;
  categories: { [key: string]: string[] } | null = JSON.parse(localStorage.getItem('categories') || 'null');

  constructor(private authSer: AuthenticateService, private categoriesSer: CategoriesService){}

  ngOnInit(): void {
    this.categoriesSer.checkupdate().subscribe({
      next: response => {
        console.log(response);
        if(localStorage.getItem('numberOfCategories') != response || localStorage.getItem('categories') == null){
          this.categoriesSer.getCategories().subscribe({
            next: responseGetC =>{
              let jsonCategories = JSON.stringify(responseGetC);
              localStorage.setItem('categories', jsonCategories);
              localStorage.setItem('numberOfCategories', response);
              this.categories = JSON.parse(localStorage.getItem('categories') || 'null');
              //window.location.reload();
            },
            error: error=>{
              localStorage.removeItem('categories');
              localStorage.removeItem('numberOfCategories');
              console.log('Error to get categories', error);
            }
          });
        }
      },
      error: error =>{ 
        localStorage.removeItem('categories');
        localStorage.removeItem('numberOfCategories');
        console.log("Error to get number of categories", error);
      }
    });
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
}
