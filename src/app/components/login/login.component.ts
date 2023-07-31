import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit{
  errorAuthentication: boolean = false;
  userAuthFormGroup = new FormGroup({
    email: new FormControl('', { validators:[Validators.required],
                              asyncValidators: [uniqueValueValidator(this.userService, false)],
                              updateOn: 'blur'}),
    password: new FormControl('', { validators: Validators.required, updateOn: 'blur'})
  });

  constructor(private authSer: AuthenticateService, private router: Router, private userService: UsersService,){}
  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.router.navigate(['/']);
    }
  }

  authenticate(){
    this.organizeInformation();
    this.authSer.login(this.userAuthFormGroup.value).subscribe({
      next: response => {
        let token = response.jwtToken;

        localStorage.setItem('token', token);
        console.log(token);
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorAuthentication = true;
        console.log(this.userAuthFormGroup.get('email')?.value);
      }
    });
  }

  private organizeInformation(): void{
    let keyValue = this.userAuthFormGroup.get("email")?.value;
    if(keyValue != null){
      this.userAuthFormGroup.get("email")?.setValue(this.changeTheText(keyValue));
      localStorage.setItem('email', this.changeTheText(keyValue));
    }
  }

  //It allow us to change the first letter to upper case and the rest lower case at start or after a space
  private changeTheText(value: string): string {
    let word = value.charAt(0).toUpperCase()+ value.slice(1).toLowerCase(); //Change the first letter to upper case and the rest lower case
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); //replace all accents letters to normal letters
    return word.trim().replace(/\s+/g, ' '); //delete all spaces at the start and allow only one space between letters
  }
}
