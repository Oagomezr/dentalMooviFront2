import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/user/users.service';
import { uniqueValueValidator } from 'src/app/validators/userFieldsValidator';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {

  currentPassword: FormControl = new FormControl('');
  newPassword: FormControl = new FormControl('');
}
