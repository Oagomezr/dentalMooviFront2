import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsData } from 'src/app/models/products/productsData';
import { ProductsService } from 'src/app/services/products/products.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {

  constructor(private route: ActivatedRoute, private productSer: ProductsService, public dialog: MatDialog) {}

  locationCategory: string[] = [];
  nameProduct: string = '';
  indexImg: number = 0;
  isAdmin: boolean = localStorage.getItem('isAdmin') != null;
  editArray: boolean[] = [true, true, true, true];
  textEdit: any = '';

  product: ProductsData ={
    nameProduct: '',
    unitPrice: 0,
    description: '',
    shortDescription: '',
    stock: 0,
    images:[],
    location: [],
    hidden: null
  };

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.nameProduct = params['product'];
      
      this.productSer.getProductByName(this.nameProduct).subscribe({
        next: response => {
          this.product = response;
          console.log(response);
          this.locationCategory = response.location;
        },
        error: error => {
          console.error("error to load product: "+error);
        }
      });
    });
  }

  changeImg(index: number){
    this.indexImg = index;
  }

  actions:string[] = [];
  openDialog(parameter:any, action:number){

    this.actions = [
      '¿Estás segur@ de establecer esta imagen coomo principal?',
      '¿Estás segur@ de eliminar esta imagen?',
      '¿Estas segur@ de que quieres cambiar la visibilidad del producto?'
    ];

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmación',
        message: this.actions[action]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (action) {
          case 0:
            this.updateMainImage(parameter);
          break;
          case 1:
            this.deleteImage(parameter);
          break;
          case 2:
            this.changeVisibility(parameter);
          break;
          default:
            console.log("error");
        }
      }else{
        console.log("Operacion cancelada");
      }
    });
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | undefined;

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    
    if (!this.selectedFile) {
      console.log('No se ha seleccionado ningún archivo.');
      return;
    }
    console.log('Archivo seleccionado:', this.selectedFile);
    
    this.productSer.uploadImage(this.selectedFile, this.product.nameProduct).subscribe({
      next: response => {
        console.log('Archivo subido con éxito al backend.', response);
        window.location.reload();
      },
      error: error=>{
        console.error("Error al subir la imagen: "+error);
      }
    });
  }

  updateMainImage(idImage:number){
    this.productSer.updateMainImage(idImage,this.product.nameProduct).subscribe({
      next: () =>{
        window.location.reload();
      },
      error: error =>{
        console.error(error);
      }
    });
  }

  deleteImage(idImage:number){
    
    let parameter = this.product.images.length == 1 ? this.product.nameProduct : idImage;

    this.productSer.deleteImage(parameter).subscribe({
      next: () =>{
        window.location.reload();
      },
      error: error =>{
        console.error(error);
      }
    });
  }

  changeVisibility(visibility:boolean){
    this.productSer.updateVisibility(visibility, this.product.nameProduct).subscribe({
      next: ()=>{
        window.location.reload();
      },
      error: error=>{
        console.error(error);
      }
    });
  }

  editProductInformation(option:number){
    this.editArray[option] = !this.editArray[option];
    switch (option) {
      case 0:
        this.textEdit = this.product.nameProduct;
      break;
      case 1:
        this.textEdit = this.product.unitPrice;
      break;
      case 2:
        this.textEdit = this.product.description;
      break;
      case 3:
        this.textEdit = this.product.stock;
      break;
      default:
        console.log("error");
    }
  }
  updateProductInformation(option:number){
    this.productSer.updateProductInformation(option, this.product.nameProduct, this.textEdit);
  }
}
