import { Component } from '@angular/core';
import { CategoriesService } from './services/categories/categories.service';
import { Categories } from './models/categories';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dental-moovi';

  constructor(private categoriesSer: CategoriesService){}

  ngOnInit(){
    this.categoriesSer.checkupdate().subscribe({
      next: response => {
        if(localStorage.getItem('numberOfCategories') != response || localStorage.getItem('categories') == null){
          this.categoriesSer.getCategories().subscribe({
            next: responseGetC =>{
              let jsonCategories = JSON.stringify(responseGetC);
              localStorage.setItem('categories', jsonCategories);
              localStorage.setItem('numberOfCategories', response);
              window.location.reload();
            },
            error: error=>{
              localStorage.removeItem('categories');
              localStorage.removeItem('numberOfCategories');
              console.log('Error to get categories', error);
            }
          });
        }
      },
      error: error =>{ 
        localStorage.removeItem('categories');
        localStorage.removeItem('numberOfCategories');
        console.log("Error to get number of categories", error);
      }
    });
  }
}
