import { Component, Input } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-gender',
  templateUrl: './select-gender.component.html',
  styleUrls: ['./select-gender.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class SelectGenderComponent {

  @Input() formGender : FormControl = new FormControl('');

}
