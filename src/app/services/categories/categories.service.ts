import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<string[]>{
    return this.http.get<string[]>(`${this.baseUrl}/public/categories`);
  }

  checkupdate(): Observable<string>{
    return this.http.get<string>(`${this.baseUrl}/public/categories/checkupdate`);
  }
}
