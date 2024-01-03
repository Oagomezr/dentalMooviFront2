import { Component, Input, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-birth',
  templateUrl: './birth.component.html',
  styleUrls: ['./birth.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule, ReactiveFormsModule],
})
export class BirthComponent implements OnInit{
  @Input() formBirthDate : FormControl = new FormControl(new Date(1990, 0, 1));
  startDate = new Date(1990, 0, 1);
  ngOnInit(): void {
    let currentDate = new Date();
    let eighteenYearsAgo = currentDate.getFullYear() - 18;
    this.startDate = new Date(eighteenYearsAgo, currentDate.getMonth(), currentDate.getDate());
    /* if(this.formBirthDate.value !== ''){
      let currentFormDate = new Date(this.formBirthDate.value);
      this.formBirthDate.setValue(new Date(currentFormDate.getFullYear(), currentFormDate.getMonth(), currentFormDate.getDate() + 1));
    } */
  }
  
}
