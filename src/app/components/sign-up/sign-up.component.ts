import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/user/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { uniqueValueValidator } from 'src/app/validators/userFieldsValidator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  userFormGroup = new FormGroup({
    idUser: new FormControl(0),
    firstName: new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9_áéíóúÁÉÍÓÚñÑ\\s]*$')], updateOn: 'blur'}),
    lastName: new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9_áéíóúÁÉÍÓÚñÑ\\s]*$')], updateOn: 'blur'}),
    email: new FormControl( '', { validators: [Validators.required, Validators.email],
                            asyncValidators: uniqueValueValidator(this.userService, true),
                            updateOn: 'blur'}),
    celPhone: new FormControl('', { validators: [Validators.required, Validators.minLength(12), Validators.pattern('^[0-9-]*$')]}),
    birthday: new FormControl(''),
    gender: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private userService: UsersService, private router: Router){}

  createUser(): void {
    if(this.userFormGroup.valid){
      this.organizeInformation();
      this.userService.createUser(this.userFormGroup.value).subscribe({
        next: userCreated => {
          console.log(userCreated);
          this.router.navigate(['/login']);
        },
        error: error => {
          console.error(error.error.message);
        }
      });
    }
    
  }

  //process each field to have organized information to database
  private organizeInformation(): void{
    //the fields we'll organize
    const fields = ["username", "firstName", "lastName", "email", "gender"];

    Object.keys(this.userFormGroup.controls).forEach(key => { //iterate all fields
      if(fields.includes(key)){ //select only fields we'll organize
        let keyValue = this.userFormGroup.get(key)?.value;
        this.userFormGroup.get(key)?.setValue(this.changeTheText(keyValue));
      }
    });
  }

  //It allow us to change the first letter to upper case and the rest lower case at start or after a space
  private changeTheText(value: string): string {
    let word = value.charAt(0).toUpperCase()+ value.slice(1).toLowerCase(); //Change the first letter to upper case and the rest lower case
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); //replace all accents letters to normal letters
    word = word.replace(/(\s|^)\w/g, (l) => l.toUpperCase()); //transform to upperCase after the space character
    return word.trim().replace(/\s+/g, ' '); //delete all spaces at the start and allow only one space between letters
  }
}
