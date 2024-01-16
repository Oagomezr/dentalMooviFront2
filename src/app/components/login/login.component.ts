import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { uniqueValueValidator } from 'src/app/validators/userFieldsValidator';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  errorAuthentication: boolean = false;
  adminAuthentication: boolean = false;
  userAuthFormGroup = new FormGroup({
    userName: new FormControl('', { validators:[Validators.required],
                              asyncValidators: [uniqueValueValidator(this.userService, false)],
                              updateOn: 'blur'}),
    password: new FormControl('', { validators: Validators.required}),
    code: new FormControl('------')
  });

  constructor(private authSer: AuthenticateService, 
    private router: Router, private userService: UsersService,){
      if(localStorage.getItem('isLogged') != null){
        this.router.navigate(['/']);
      }
      if (localStorage.getItem('register') != null) {
        localStorage.removeItem("register");
        this.registrationNotice = true;
      }
      if(localStorage.getItem('shoppingNotice') != null){
        this.shoppingNotice = true;
      }
  }

  registrationNotice: boolean = false;
  shoppingNotice: boolean = false;

  email : string = '';
  authenticate(){
    this.organizeInformation();
    this.authSer.checkRole(this.userAuthFormGroup.value).subscribe({
      next: reponse =>{
        if(reponse){
          this.adminAuthentication = true;
          this.email = this.userAuthFormGroup.get('userName')?.value ?? '';
        }else this.login();
        
      },
      error: () =>{
        this.errorAuthentication = true;
      }
    });
  }

  showOK: boolean = false;
  badCode: boolean = false;
  confirmCode(code: string){
    this.userAuthFormGroup.get('code')?.setValue(code);
    if (/^\d*$/.test(this.userAuthFormGroup.get('code')?.value || 'x')) {
      this.authSer.login(this.userAuthFormGroup.value).subscribe({
        next: () => {
          this.showOK = true;
          localStorage.removeItem("isLogged");
          localStorage.setItem("isLogged", "true");
          localStorage.removeItem("isAdmin");
          localStorage.setItem("isAdmin", "true");
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);

        },
        error: error => {
          console.error(error);
          this.badCode = true;
        }
      });
    }
  }

  session:boolean = false;
  private login(){
    this.authSer.login(this.userAuthFormGroup.value).subscribe({
      next: () => {
        localStorage.removeItem("isLogged");
        localStorage.setItem("isLogged", "true");
        this.session = true;
        this.errorAuthentication = false;
        this.adminAuthentication = false;
        this.registrationNotice = false;
        if(this.shoppingNotice){
          setTimeout(() => {
            this.router.navigate(['/orderDetails']);
          }, 3000);
          
        }else{
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
          
        }
        localStorage.removeItem("shoppingNotice");
      },
      error: () => {
        this.errorAuthentication = true;
      }
    });
  }

  private organizeInformation(): void{
    let keyValue = this.userAuthFormGroup.get("userName")?.value;
    if(keyValue != null){
      this.userAuthFormGroup.get("userName")?.setValue(this.changeTheText(keyValue));
    }
  }

  //It allow us to change the first letter to upper case and the rest lower case at start or after a space
  private changeTheText(value: string): string {
    let word = value.charAt(0).toUpperCase()+ value.slice(1).toLowerCase(); //Change the first letter to upper case and the rest lower case
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); //replace all accents letters to normal letters
    return word.trim().replace(/\s+/g, ' '); //delete all spaces at the start and allow only one space between letters
  }
}
