import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userFormGroup = new FormGroup({
    username: new FormControl('', { validators:[Validators.required, Validators.pattern('^[a-zA-Z0-9_-]*$')], updateOn: 'blur'}),
    password: new FormControl('', { validators: Validators.required, updateOn: 'blur'})
  });
}
