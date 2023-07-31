import { Component } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isAuthenticate:boolean = false;
  name?:string|null;
  lastName?:string|null ;

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
        error: () => {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          this.isAuthenticate=false;
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
          console.error('Error al hacer logout:', error);
        }
      });
    }else{
      console.log("Usuario no logueado");
    }
  }

  showHoverBox: boolean = false;

  showBox(): void {
    this.showHoverBox = !this.showHoverBox;
  }
}
