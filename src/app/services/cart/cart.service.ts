import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartRequest } from 'src/app/models/cart/cartRequest';
import { CartResponse } from 'src/app/models/cart/cartResponse';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartResponse: CartResponse = { data: [], total:0, amountOfProducts:0};
  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) {}

  generateOrder(req: CartRequest, idAddress:number): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/user/generateOrder/${idAddress}`, req, {withCredentials:true});
  }
}
