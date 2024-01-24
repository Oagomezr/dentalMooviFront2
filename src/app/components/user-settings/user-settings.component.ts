import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {
  constructor(private router: Router){
    this.router.navigate(['/orderDetails'])
  }
  currentPassword: FormControl = new FormControl('');
  newPassword: FormControl = new FormControl('');
}
