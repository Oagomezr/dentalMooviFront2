import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsData } from 'src/app/models/products/productsData';
import { ProductsResponse } from 'src/app/models/products/productsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) { }

  getProductsByCategory(name:string, currentPage: number, productsPerPage: number): Observable<ProductsResponse>{
    return this.http.get<ProductsResponse>(`${this.baseUrl}/public/products/category/${name}/${currentPage}/${productsPerPage}`);
  }

  checkupdateByCategory(name:string): Observable<string>{
    return this.http.get<string>(`${this.baseUrl}/public/products/category/checkupdate/${name}`);
  }

  checkupdateProduct(name:string): Observable<string>{
    return this.http.get<string>(`${this.baseUrl}/public/products/checkupdate/${name}`);
  }

  getProductByName(name:string): Observable<ProductsData>{
    return this.http.get<ProductsData>(`${this.baseUrl}/public/products/${name}`);
  }
}
