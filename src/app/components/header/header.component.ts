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

  constructor(private authSer: AuthenticateService){}

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
}
