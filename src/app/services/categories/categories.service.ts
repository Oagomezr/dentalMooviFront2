import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories[]>{
    return this.http.get<Categories[]>(`${this.baseUrl}/public/categories`);
  }

  checkupdate(): Observable<string>{
    return this.http.get<string>(`${this.baseUrl}/public/categories/checkupdate`);
  }
}
