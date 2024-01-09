import { Component, Input } from '@angular/core';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-hover-box-profile',
  templateUrl: './hover-box-profile.component.html',
  styleUrls: ['./hover-box-profile.component.scss']
})
export class HoverBoxProfileComponent {
  userData: Users | null = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null;
}
