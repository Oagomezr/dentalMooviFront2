import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/user/users.service';
import { uniqueValueValidator } from 'src/app/validators/userFieldsValidator';
import { BirthComponent } from "../../sign-up/birth/birth.component";
import { SelectGenderComponent } from "../../sign-up/select-gender/select-gender.component";
import { CelPhoneComponent } from "../../sign-up/cel-phone/cel-phone.component";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-edit-personal-info',
    templateUrl: './edit-personal-info.component.html',
    styleUrls: ['./edit-personal-info.component.scss'],
    standalone: true,
    imports: [
      CommonModule, MatFormFieldModule, ReactiveFormsModule, BirthComponent, 
      SelectGenderComponent, CelPhoneComponent, MatFormFieldModule, MatInputModule, 
      MatButtonModule]
})
export class EditPersonalInfoComponent {
  isUpdated: boolean = false;
  userData!: Users;
  birthdate:string = '';
  ref:string | null = localStorage.getItem('isLogged');
  isLogged: boolean = this.ref != null;

  constructor(private userSer: UsersService, private router: Router){}

  ngOnInit(){
    if(!this.isLogged) this.router.navigate(['/']);
    else{
      this.userSer.getUser(this.ref!).subscribe({
        next: response => {
          this.userData = response;
        
        },
        error: error => {
          localStorage.clear();
          console.log("Error to get user info", error);
          window.location.reload();
        }
      });
    }
  }

  userFormGroup = new FormGroup({
    idUser: new FormControl(0),
    firstName: new FormControl(this.userData?.firstName, { validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9_áéíóúÁÉÍÓÚñÑ\\s]*$')], updateOn: 'blur'}),
    lastName: new FormControl(this.userData?.lastName, { validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9_áéíóúÁÉÍÓÚñÑ\\s]*$')], updateOn: 'blur'}),
    email: new FormControl( null, { validators: [Validators.required, Validators.email],
                            asyncValidators: uniqueValueValidator(this.userSer, true),
                            updateOn: 'blur'}),
    celPhone: new FormControl(this.userData?.celPhone, { validators: [Validators.required, Validators.minLength(12), Validators.pattern('^[0-9-]*$')]}),
    birthdate: new FormControl(this.userData?.birthdate+'T00:00:00'),
    gender: new FormControl(this.userData?.gender, Validators.required),
    password: new FormControl(null, Validators.required),
    code: new FormControl(null)
  });

  update(){
    this.userSer.updateUser(this.userFormGroup.value, this.ref!).subscribe({
      next: () => {
        localStorage.removeItem("userData");
        this.isUpdated=true;
        setTimeout(() => {
          this.router.navigate(['/settings']);
        }, 2000);
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
