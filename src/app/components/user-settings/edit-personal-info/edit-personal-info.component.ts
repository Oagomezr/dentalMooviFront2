import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/user/users.service';
import { uniqueValueValidator } from 'src/app/validators/userFieldsValidator';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.scss']
})
export class EditPersonalInfoComponent {
  isUpdated: boolean = false;
  userData: Users | null = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null;
  birthdate:string = '';

  constructor(private userService: UsersService, private router: Router){
    if(this.userData == null) this.router.navigate(['/']);
  }

  userFormGroup = new FormGroup({
    idUser: new FormControl(0),
    firstName: new FormControl(this.userData?.firstName, { validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9_áéíóúÁÉÍÓÚñÑ\\s]*$')], updateOn: 'blur'}),
    lastName: new FormControl(this.userData?.lastName, { validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9_áéíóúÁÉÍÓÚñÑ\\s]*$')], updateOn: 'blur'}),
    email: new FormControl( null, { validators: [Validators.required, Validators.email],
                            asyncValidators: uniqueValueValidator(this.userService, true),
                            updateOn: 'blur'}),
    celPhone: new FormControl(this.userData?.celPhone, { validators: [Validators.required, Validators.minLength(12), Validators.pattern('^[0-9-]*$')]}),
    birthdate: new FormControl(this.userData?.birthdate+'T00:00:00'),
    gender: new FormControl(this.userData?.gender, Validators.required),
    password: new FormControl(null, Validators.required),
    code: new FormControl(null)
  });

  update(){
    
    this.userService.updateUser(this.userFormGroup.value).subscribe({
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
