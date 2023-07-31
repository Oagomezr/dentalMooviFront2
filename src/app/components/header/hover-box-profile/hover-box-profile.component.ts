import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hover-box-profile',
  templateUrl: './hover-box-profile.component.html',
  styleUrls: ['./hover-box-profile.component.scss']
})
export class HoverBoxProfileComponent {
  @Input() profileName: string | null | undefined;


}
