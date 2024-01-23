import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartRequest } from 'src/app/models/cart/cartRequest';
import { CartResponse } from 'src/app/models/cart/cartResponse';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  isAdmin: boolean = localStorage.getItem('isAdmin') != null;
  access: string = this.isAdmin ? "admin" : "user";
  cartResponse: CartResponse = { data: [], total:0, amountOfProducts:0};
  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) {}

  generateOrder(req: CartRequest, idAddress: number): Observable<HttpResponse<Blob>> {
    const url = `${this.baseUrl}/${this.access}/generateOrder/${idAddress}`;
    
    return this.http.post(url, req, {
      observe: 'response',
      responseType: 'blob',
      withCredentials: true,
    });
  }
}
