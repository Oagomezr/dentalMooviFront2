import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from 'src/app/models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) { }

  getProductsByCategory(id:number): Observable<Products[]>{
    return this.http.get<Products[]>(`${this.baseUrl}/public/products/${id}`);
  }

  checkupdate(id:number): Observable<string>{
    return this.http.get<string>(`${this.baseUrl}/public/products/checkupdate/${id}`);
  }
}
