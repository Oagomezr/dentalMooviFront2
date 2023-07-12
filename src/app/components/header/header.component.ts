import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authSer: AuthenticateService, private router: Router){}

  ngOnInit(): void {
    let jwt = localStorage.getItem('token');
    if(jwt!=null){
      this.authSer.getUserByToken(jwt).subscribe({
        next: response => {
          this.name=response.firstName;
          this.lastName=response.lastName;
          this.isAuthenticate=true;
        },
        error: () => {
          localStorage.removeItem('token');
          this.isAuthenticate=false;
        }
      });
    }
  }
}
