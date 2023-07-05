import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userAuthFormGroup = new FormGroup({
    username: new FormControl('', { validators:[Validators.required, Validators.pattern('^[a-zA-Z0-9_-]*$')], updateOn: 'blur'}),
    password: new FormControl('', { validators: Validators.required, updateOn: 'blur'})
  });

  constructor(private authSer: AuthenticateService, private router: Router){}

  authenticate(){
    this.authSer.login(this.userAuthFormGroup.value).subscribe({
      next: response => {
        const token = response.jwtToken;
        localStorage.setItem('token', token);
        console.log(token);
        this.router.navigate(['/']);
      },
      error: error => {
        console.error(error.error.message);
      }
    });
  }
}
