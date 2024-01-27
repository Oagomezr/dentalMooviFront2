import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressesData } from 'src/app/models/addresses/addressesData';
import { UsersService } from 'src/app/services/user/users.service';
import { SelectDepartamentComponent } from "./select-departament/select-departament.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { CelPhoneComponent } from "../../../sign-up/cel-phone/cel-phone.component";

@Component({
    selector: 'app-edit-address',
    templateUrl: './edit-address.component.html',
    styleUrls: ['./edit-address.component.scss'],
    standalone: true,
    imports: [CommonModule, SelectDepartamentComponent, MatFormFieldModule, ReactiveFormsModule, CelPhoneComponent]
})
export class EditAddressComponent {

  addressInfo : AddressesData = localStorage.getItem('addressChosen') ? JSON.parse(localStorage.getItem('addressChosen')!) : {
    id:0,
    departament: '',
    location: '',
    address: '',
    phone: '',
    description: ''
  }

  ref:string | null = localStorage.getItem('isLogged');
  isEdit:boolean = this.addressInfo.id != 0;
  addressNotice: boolean = false;

  constructor(private userService: UsersService, private router: Router){
    console.log(this.addressInfo);
    if(localStorage.getItem('addressNotice') != null){
      localStorage.removeItem("addressNotice");
      this.addressNotice = true;
    }
    if(this.ref == null) this.router.navigate(['/']);
  }

  isUpdated: boolean = false;

  addressFormGroup = new FormGroup({
    id: new FormControl( this.addressInfo.id ),
    departament: new FormControl(this.addressInfo.departament, { validators: [Validators.required], updateOn: 'blur'}),
    location: new FormControl(this.addressInfo.location, { validators: [Validators.required], updateOn: 'blur'}),
    address: new FormControl( this.addressInfo.address, { validators: [Validators.required], updateOn: 'blur'}),
    phone: new FormControl( this.addressInfo.phone, { validators: [Validators.required, Validators.minLength(12), Validators.pattern('^[0-9-]*$')]}),
    description: new FormControl( this.addressInfo.description),
  });

  send(){
    if(this.addressInfo.id == 0){
      this.userService.addAddress(this.addressFormGroup.value, this.ref!).subscribe({
        next: () =>{
          this.isUpdated=true;
          setTimeout(() => {
            if(this.addressNotice){
              this.router.navigate(['/orderDetails']);
            }else{
              this.router.navigate(['/settings/addresses']);
            }
          }, 2000);
        },error: e =>{
          console.error(e);
          this.router.navigate(['/settings/addresses']);
        }
      });
    }else{
      this.userService.updateAddress(this.addressFormGroup.value, this.ref!).subscribe({
        next: () =>{
          this.isUpdated=true;
          setTimeout(() => {
            this.router.navigate(['/settings/addresses']);
          }, 2000);
        },error: e =>{
          console.error(e);
          this.router.navigate(['/settings/addresses']);
        }
      });
    }
    
  }
}
