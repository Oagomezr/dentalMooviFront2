import { Component } from '@angular/core';
import { CategoriesService } from './services/categories/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dental-moovi';
  loading = JSON.parse(localStorage.getItem('loading') ?? 'null');

  constructor(private categoriesSer: CategoriesService){}

  ngOnInit(){
    this.categoriesSer.checkupdate().subscribe({
      next: response => {
        if(localStorage.getItem('checkUpdateCategories') != response || localStorage.getItem('categories') == null){
          this.categoriesSer.getCategories().subscribe({
            next: responseGetC =>{
              let jsonCategories = JSON.stringify(responseGetC.data);
              localStorage.setItem('categories', jsonCategories);
              localStorage.setItem('checkUpdateCategories', response);
              localStorage.setItem('loading', JSON.stringify(true));
              window.location.reload();
            },
            error: error=>{
              localStorage.removeItem('categories');
              localStorage.removeItem('checkUpdateCategories');
              localStorage.removeItem('loading');
              console.log('Error to get categories', error);
            }
          });
        }
      },
      error: error =>{ 
        localStorage.removeItem('categories');
        localStorage.removeItem('checkUpdateCategories');
        localStorage.removeItem('loading');
        console.log("Error to get checkUpdate of categories", error);
      }
    });
  }
}
