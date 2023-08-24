import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesResponse } from 'src/app/models/categories/categoriesResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoriesResponse>{
    return this.http.get<CategoriesResponse>(`${this.baseUrl}/public/categories`);
  }

  checkupdate(): Observable<string>{
    return this.http.get<string>(`${this.baseUrl}/public/categories/checkupdate`);
  }

  getNameCategoryById(id:number): Observable<string>{
    return this.http.get<string>(`${this.baseUrl}/public/categories/${id}`);
  }
}
