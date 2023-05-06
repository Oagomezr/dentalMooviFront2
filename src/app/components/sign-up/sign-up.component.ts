import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/user/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { uniqueValueValidator } from 'src/app/validators/userFieldsValidator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  userFormGroup = new FormGroup({
    idUser: new FormControl(0),
    username: new FormControl('', { validators:[Validators.required, Validators.pattern('/^[a-zA-Z0-9_-]*$/i')],
                              asyncValidators: uniqueValueValidator(this.userService, 'username'),
                              updateOn: 'blur'}),
    firstName: new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_-]*$')], updateOn: 'blur'}),
    lastName: new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_-]*$')], updateOn: 'blur'}),
    email: new FormControl( '', { validators: [Validators.required, Validators.email],
                            asyncValidators: uniqueValueValidator(this.userService, 'email'),
                            updateOn: 'blur'}),
    celPhone: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$')], updateOn: 'blur'}),
    birthday: new FormControl(''),
    gender: new FormControl('', Validators.required),
    password: new FormControl('')
  });

  constructor(private userService: UsersService){}

  createUser(): void {
    this.organizeInformation();
    this.userService.createUser(this.userFormGroup.value).subscribe({
      next: userCreated => {
        console.log(userCreated);
      },
      error: error => {
        console.error(error.error.message);
      }
    });
  }

  //process each field to have organized information to database
  private organizeInformation(): void{
    Object.keys(this.userFormGroup.controls).forEach(key => { //iterate all fields
      let keyValue = this.userFormGroup.get(key)?.value;
      if(typeof keyValue==='string' && !(/\d/.test(keyValue))){
        this.userFormGroup.get(key)?.setValue(this.changeTheText(keyValue));
      }
    });
  }

  //It allow us to change the first letter to upper case and the rest lower case at start or after a space
  private changeTheText(value: string): string {
    let word = value.charAt(0).toUpperCase()+ value.slice(1).toLowerCase(); //Change the first letter to upper case and the rest lower case
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); //replace all accents letters to normal letters
    word.replace(/\b\w/g, (l) => l.toUpperCase()); //transform to upperCase after the space character
    return word.trim().replace(/\s+/g, ' '); //delete all spaces at the start and allow only one space between letters
  }
}
