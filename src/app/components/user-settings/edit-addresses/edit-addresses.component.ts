import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddressesData } from 'src/app/models/addresses/addressesData';
import { UsersService } from 'src/app/services/user/users.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-addresses',
  templateUrl: './edit-addresses.component.html',
  styleUrls: ['./edit-addresses.component.scss']
})
export class EditAddressesComponent {

  addresses: AddressesData[] = [];

  constructor(private userService: UsersService, private router: Router, public dialog: MatDialog){
    localStorage.removeItem("addressChosen");
    this.userService.getAddresses().subscribe({
      next: response=>{
        console.log(response);
        this.addresses = response.data;
      },error: e =>{
        console.log(e);
        this.router.navigate(['login']);
      }
    });
  }

  selectAddress(index:number){
    let addressChosen = JSON.stringify(this.addresses[index]);
    localStorage.setItem('addressChosen', addressChosen);
    this.router.navigate(['settings/addresses/address']);
  }

  isDelete:boolean = false;

  openDialog(index:number){

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '390px',
      data: {
        title: 'Confirmación',
        message: "¿Segur@ que deseas eliminar el domicilio: "+this.addresses[index].address+ "?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteAddress(this.addresses[index].id!).subscribe({
          next:()=>{
            this.isDelete = true;
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          },error:e=>{
            console.log(e);
          }
        });
      }else{
        console.log("Operacion cancelada");
      }
    });
  }
}
