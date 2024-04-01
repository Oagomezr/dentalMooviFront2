import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordComponent } from "../password-field/password.component";

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss'],
    standalone: true,
    imports: [CommonModule, PasswordComponent]
})
export class UserSettingsComponent {
  
  constructor(private router: Router){}

  isLogged: boolean = localStorage.getItem('isLogged') != null;
  currentPassword: FormControl = new FormControl('');
  newPassword: FormControl = new FormControl('');

  ngOnInit(){ if(!this.isLogged) this.router.navigate(['/']); }
  
}
